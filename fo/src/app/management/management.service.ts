import { Injectable } from '@angular/core';
import {PublisherApiService} from '../core/serviecs/publisher-api.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  constructor(private publisherService: PublisherApiService) {}

  //GET REQUESTS
  getUser(publisherId): any {
    return this.publisherService.UserDetailRequests('get', publisherId).toPromise();
  }

  getLastLogin(username) {
    return this.publisherService.getPublisherLastLogin(username).toPromise();
  }

  getReportColumns(publisherId, monetizationId) {
    return this.publisherService.ReportColumnsRequests('get', publisherId, monetizationId)
  }

  getPaymentMethod(publisherId) {
    return this.publisherService.paymentMethods('get', publisherId).toPromise()
  }

  getPaymentHistory(publisherId) {
    return this.publisherService.getPaymentHistory(publisherId).toPromise();
  }

  getOwnershipHistory(publisherId) {
    return this.publisherService.getOwnershipHistory(publisherId).toPromise();
  }

  getTagsbySiteId(siteId) {
    return this.publisherService.getPublisherTagsBySiteId(siteId).toPromise();
  }

  // CRUD REQUESTS
  async updateUserDetails(publisherId, data) {
    return await this.publisherService.UserDetailRequests('put', publisherId, data).toPromise();
  }

  async updatePaymentMethod(publisherId, paymentMethodId, data) {
    return await this.publisherService.paymentMethods('put', publisherId, paymentMethodId, data).toPromise();
  }

  async postReportColumn(id, monitizationId, data) {
    return await this.publisherService.ReportColumnsRequests('post', id, monitizationId, data).toPromise();
  }

  async postTakeOwner(publisherId) {
    return await this.publisherService.TakeOwnership(publisherId).toPromise();
  }

//  DELETE REQUEST
  async deleteUser(publisherId) {
    return await this.publisherService.UserDetailRequests('delete', publisherId).toPromise();
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

  removeDupicatesHistoryOwner(ownershipHistory) {
    let holder = {};
    let history = [];
    ownershipHistory.forEach(
      log => {
        if (log['username'] !== holder['username'] && log['timestamp'] !== holder['timestamp']) {
          history.push(log)
        }
        holder = log;
      });
    return history
  }

  getSiteTags(sites) {
    sites.forEach(site => {
      this.getTagsbySiteId(site._id)
        .then(response => {
          if (response['message'].results.length > 0) {
            site['tags'] = response['message'].results;
          }
        });
    });
  };
}
