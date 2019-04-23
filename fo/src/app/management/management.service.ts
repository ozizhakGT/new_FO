import { Injectable } from '@angular/core';
import {PublisherApiService} from '../core/serviecs/publisher-api.service';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  presentPublihser = new Subject();
  publisherlastSeen = new Subject();
  constructor(private publisherService: PublisherApiService) { }

  ongetPublisherDetails(publisherId) {
    this.publisherService.getPublisherDetails(publisherId)
      .subscribe(
        response => {
          const publisher = Array.of(response['message'].results[0]);
            this.presentPublihser.next(publisher);
            // this.getOwner(publisher)
        }
      );
  }

  getPublisherLastLogin(username) {
    this.publisherService.getPublisherLastLogin(username)
      .subscribe(
        response => {
          const lastSeen = Array.of(response['message'].results[0]);
          return lastSeen;
        }
      );
  }

  // getOwner(publisher) {
  //   if (publisher[0]) {
  //     // this.publisherService.getPublishers(publisher.id)
  //     console.log(publisher[0])
  //   }
  // }
}
