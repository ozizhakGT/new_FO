import { Injectable } from '@angular/core';
import {PublisherApiService} from "../core/serviecs/publisher-api.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  presentPublihser = new Subject();
  constructor(private publisherService: PublisherApiService) { }

  getUserDetails(publisherId) {
    this.publisherService.getUserDetails(publisherId)
      .subscribe(
        resolve => {
          const publisher = Array.of(resolve['message'].results[0]);
            this.presentPublihser.next(publisher);
            this.getOwner(publisher)
        }
      )
  }

  getOwner(publisher) {
    if (publisher[0]) {
      // this.publisherService.getPublishers(publisher.id)
      console.log(publisher[0])
    }
  }
}
