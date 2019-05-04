import { Injectable } from '@angular/core';
import {PublisherApiService} from '../core/serviecs/publisher-api.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  constructor(private publisherService: PublisherApiService) {}

  //GET REQUEST
  getUser(id): any {
    return this.publisherService.UserDetailRequests('get', id).toPromise();
  }

  getLastLogin(username) {
    return this.publisherService.getPublisherLastLogin(username).toPromise();
  }

  getReportColumns(userId, monetizationId) {
    return this.publisherService.ReportColumnsRequests('get', userId, monetizationId)
  }



  // POST REQUEST
  async updateUserDetails(id, data) {
    return await this.publisherService.UserDetailRequests('put', id, data).toPromise();
  }

  async postReportColumn(id, monitizationId, data) {
    return await this.publisherService.ReportColumnsRequests('post', id, monitizationId, data).toPromise();
  }


//  FIX REPORT COLUMN OBJECT
  fixReportColumn(columns) {
    console.log(columns)
    const columnsArray = [];
    for (let column in columns) {
        if (columns[column]) {
         columnsArray.push(column)
        }
    }
    columns = columnsArray.join(';')
    console.log(columns)
  }
}
