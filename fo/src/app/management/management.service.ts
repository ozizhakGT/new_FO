import { Injectable } from '@angular/core';
import {PublisherApiService} from '../core/serviecs/publisher-api.service';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  constructor(private publisherService: PublisherApiService) {}

  getUser(id): any {
    return this.publisherService.getPublisherDetails(id).toPromise()
  }

  getLastLogin(username) {
    return this.publisherService.getPublisherLastLogin(username).toPromise()
  }

}
