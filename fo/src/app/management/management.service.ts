import { Injectable } from '@angular/core';
import {PublisherApiService} from '../core/serviecs/publisher-api.service';
import {Subject} from 'rxjs/Subject';
import {map} from "rxjs/operators";
import {UserDetails} from "../shared/interfaces/user-details.interface";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  presentPublihser = new Subject();
  constructor(private publisherService: PublisherApiService) { }

  onGetPublisherDetails(publisherId) {
    const publisher: UserDetails = {
      details: [],
      last_login: [],
      owner: []
    };
    this.publisherService.getPublisherDetails(publisherId)
      .then(
        response => {
          publisher.details.push(response['message'].results[0]);
            if (publisher.details[0].username.length > 3) {
              this.publisherService.getPublisherLastLogin(publisher.details[0].username)
                .subscribe(response => {
                  publisher.last_login.push(response['message'].results[0])
                })
            }
            if (typeof publisher.details[0].account_manager_id === 'number') {
              this.publisherService.getPublishers(publisher.details[0].account_manager_id)
                .pipe(
                  map(
                    (publishers) => {
                      const publisherOwner = {};
                      for (let key in publishers) {
                        let owner = publishers[key];
                        if (owner._id === publisher.details[0].account_manager_id) {
                          publisherOwner['owner'] = owner.username;
                          return publisherOwner;
                        }}
                    })
                )
                .subscribe(
                  account_manager => {
                    publisher.owner.push(account_manager)
                  }
                )
            }
            // console.log(publisher);
            this.presentPublihser.next(publisher)
        }
      )
      .catch(err => console.error(err))
  }

   // getOwner(publisherId) {
   //  this.publisherService.getPublishers(publisherId)
   //    .subscribe(
   //      publishers => {
   //        publishers.forEach(publisher => {
   //          if (publisher._id === publisherId) {
   //            return publisher.username
   //          }
   //        })
   //      },
   //      error1 => console.log(error1)
   //    )}
}
