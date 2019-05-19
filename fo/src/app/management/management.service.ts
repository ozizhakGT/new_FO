import { Injectable } from '@angular/core';
import {ApiService} from '../core/serviecs/api.service';
import {UtilsService} from "../core/serviecs/utils.service";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  constructor(private apiService: ApiService, private utilsService: UtilsService) {}

  //GET REQUESTS
  getUser(publisherId): any {
    return this.apiService.UserDetailRequests('get', publisherId).toPromise();
  }

  getLastLogin(username) {
    return this.apiService.getPublisherLastLogin(username).toPromise();
  }

  getReportColumns(publisherId, monetizationId) {
    return this.apiService.ReportColumnsRequests('get', publisherId, monetizationId)
  }

  getPaymentMethod(publisherId) {
    return this.apiService.paymentMethods('get', publisherId).toPromise()
  }

  getPaymentHistory(publisherId) {
    return this.apiService.getPaymentHistory(publisherId).toPromise();
  }

  getOwnershipHistory(publisherId) {
    return this.apiService.getOwnershipHistory(publisherId).toPromise();
  }

  getTagsbySiteId(siteId) {
    return this.apiService.getPublisherTagsBySiteId(siteId).toPromise();
  }
  getSitesAndTags(publisherId) {
    return this.apiService.getPublisherSitesAndTags(publisherId).toPromise();
  }
  getVerticals() {
    return this.apiService.getVerticals();
  }
  getAccountManagerPublishers(account_manager_id) {
    return this.apiService.getPublisherByAccountManager(account_manager_id).toPromise()
  }

  // CRUD REQUESTS
   updateUserDetails(publisherId, data) {
    return this.apiService.UserDetailRequests('put', publisherId, data).toPromise();
  }

   updatePaymentMethod(publisherId, paymentMethodId, data) {
    return this.apiService.paymentMethods('put', publisherId, paymentMethodId, data).toPromise();
  }
  updateBILive(tagId, live) {
    return this.apiService.updateBILive(tagId,live);
  }

  async postReportColumn(id, monitizationId, data) {
    return await this.apiService.ReportColumnsRequests('post', id, monitizationId, data).toPromise();
  }

   postTakeOwner(publisherId) {
    return this.apiService.updateOwnership(publisherId).toPromise();
  }

//  DELETE REQUEST
   deleteUser(publisherId) {
    return this.apiService.UserDetailRequests('delete', publisherId).toPromise();
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

  //REMOVE DUPLICATES OWNERS ON HISTORY LOG
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

  // IF HAVE NO TAGS ON SITE ARRAY THIS FUNCTION WILL GET AND ORGANIZE THEM
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
