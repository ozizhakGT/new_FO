import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvService} from "../../env.service";
import {Publisher} from "../../shared/interfaces/publisher.interface";
import {Site} from "../../shared/interfaces/site.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token = 'authenticationToken=edd5eabf-73c8-4dda-b279-91563cc846a2';
  baseUrl = '';

  constructor(private env: EnvService, private http: HttpClient) {
    this.baseUrl = this.env.apiBEUrl;
    if (this.env.enableDebug) {
      console.log('debug mode enable');
    }
  }

  // COMBINED REQUESTS
  UserDetailRequests(request, publisherId, data?: {}) {
    const userDetailsUrl = `${this.baseUrl}user/${publisherId}?${this.token}`;
    switch (request) {
      case 'get':
        return this.http.get(userDetailsUrl);
      case 'put':
        return this.http.put(userDetailsUrl, data);
      case 'delete':
        return this.http.delete(userDetailsUrl);
    }
  }
  ReportColumnsRequests(request, userId, monetizationId , data?: {}) {
    const reportsUrl = `${this.baseUrl}publisher_report_columns?user_id=${userId}&monetization_id=${monetizationId}&${this.token}`;
    switch (request) {
      case 'get':
        return this.http.get(reportsUrl);
      case 'post':
        return this.http.post(reportsUrl, data);
    }
  }
  paymentMethods(request, userId, paymentMethodId?, data?: {}) {
    const paymentMethodUrl = `${this.baseUrl}user/${userId}/payment_method`;
    switch (request) {
      case 'get':
        return this.http.get(`${paymentMethodUrl}?${this.token}`);
      case 'put':
        return this.http.put(`${paymentMethodUrl}/${paymentMethodId}?${this.token}`, data);
    }
  }
  sitesDetails(method, siteId, data?: Site) {
    const siteUrl = `${this.baseUrl}sites/${siteId}?${this.token}`;
    switch (method) {
      case 'get':
        return this.http.get(siteUrl);
        break;
      case 'put':
        return this.http.put(siteUrl, data);
    }

  }

  // GET REQUEST
  getPublishers(query) {
    return this.http.get<Publisher[]>(this.baseUrl + `publishers_search?&q=${query}&${this.token}`);
  }
  getOwnershipHistory(publisherId) {
    return this.http.get(`${this.baseUrl}query/ownership_history?publisher_id=${publisherId}&${this.token}`);
  }
  getPublisherLastLogin(username) {
    return this.http.get( `${this.baseUrl}query/user_last_login?username=${username}`);
  }
  getPublisherTagsBySiteId(siteId) {
    return this.http.get(`${this.baseUrl}query/site_tags?site_id=${siteId}&${this.token}`);
  }
  getPublisherSitesAndTags(publisherId) {
    return this.http.get(`${this.baseUrl}query/sites_tags?publisher_id=${publisherId}&${this.token}`);
  }
  getPublisherByAccountManager(account_manager_id) {
    return this.http.get(`${this.baseUrl}query/account_manager_publishers?account_manager_id=${account_manager_id}&${this.token}`);
  }
  getPaymentHistory(userId) {
    return this.http.get(`${this.baseUrl}payment_method_history?user_id=${userId}&${this.token}`);
  }
  getVerticals(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}verticals?${this.token}`).toPromise()
  }

  // CRUD REQUEST
  async postGoogleAuthentication(tokenId) {
    return await this.http.post(`${this.baseUrl}auth_google`, tokenId).toPromise();
  }
  updateOwnership(publisherId) {
    return this.http.post(`${this.baseUrl}publisher_account_manager_association?publisher_id=${publisherId}&${this.token}`, {}  );
  }
  updateBILive(tagId,live) {
    return this.http.put(`${this.baseUrl}bi_manual_data_live?tag_id=${tagId}&live=${live}&${this.token}`,{});
  }
}
