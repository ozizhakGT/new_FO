import { Injectable } from '@angular/core';
import {PublisherApiService} from '../core/serviecs/publisher-api.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  constructor(private publisherService: PublisherApiService) {}

  getUser(id): any {
    return this.publisherService.UserDetailRequests('get',id).toPromise();
  }

  getLastLogin(username) {
    return this.publisherService.getPublisherLastLogin(username).toPromise();
  }

  getReportColumns(userId, monetizationId) {
    return this.publisherService.ReportColumnsRequests('get', userId, monetizationId)
  }

  updateUserDetails(id, data) {
    return this.publisherService.UserDetailRequests('put', id, data);
  }
}
