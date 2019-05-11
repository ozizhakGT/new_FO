import { Injectable } from '@angular/core';
import {PublisherApiService} from '../core/serviecs/publisher-api.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  constructor(private publisherService: PublisherApiService) {}

  //GET REQUESTS
  getUser(id): any {
    return this.publisherService.UserDetailRequests('get', id).toPromise();
  }

  getLastLogin(username) {
    return this.publisherService.getPublisherLastLogin(username).toPromise();
  }

  getReportColumns(userId, monetizationId) {
    return this.publisherService.ReportColumnsRequests('get', userId, monetizationId)
  }

  getPaymentMethod(userId) {
    return this.publisherService.paymentMethods('get', userId).toPromise()
  }

  getPaymentHistory(userId) {
    return this.publisherService.getPaymentHistory(userId).toPromise();
  }

  // CRUD REQUESTS
  async updateUserDetails(userId, data) {
    return await this.publisherService.UserDetailRequests('put', userId, data).toPromise();
  }

  async updatePaymentMethod(userId, paymentMethodId, data) {
    return await this.publisherService.paymentMethods('put', userId, paymentMethodId, data).toPromise();
  }

  async postReportColumn(id, monitizationId, data) {
    return await this.publisherService.ReportColumnsRequests('post', id, monitizationId, data).toPromise();
  }

//  DELETE REQUEST
  async deleteUser(id) {
    return await this.publisherService.UserDetailRequests('delete', id).toPromise();
  }


//  FIX REPORT COLUMN OBJECT
  fixReportColumn(columns) {
    let report = JSON.parse(JSON.stringify(columns));
    let reportArray = [];
    for (let reportKey in report.columns) {
      if (report.columns[reportKey]) {
        reportArray.push(reportKey);
      }
      delete report.columns[reportKey];
    }
    report.columns = reportArray.join(';');
    return report;
  }
}
