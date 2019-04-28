import { Injectable } from '@angular/core';
import {PublisherApiService} from '../core/serviecs/publisher-api.service';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  publisherDetails;
  hasPublisher = new BehaviorSubject<boolean>(false);
  publisher = new Subject();
  constructor(private publisherService: PublisherApiService) {}

  getUser(id) {
    return this.publisherService.getPublisherDetails(id);
  }

}
