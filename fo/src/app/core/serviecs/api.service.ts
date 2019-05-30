import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvService} from "../../env.service";
import {Publisher} from "../../shared/interfaces/publisher.interface";
import {Site} from "../../shared/interfaces/site.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = '';

  constructor(private env: EnvService, private http: HttpClient) {
    this.baseUrl = this.env.apiBEUrl;
    if (this.env.enableDebug) {
      console.log('debug mode enable');
    }
  }

  // COMBINED REQUESTS
  UserDetailRequests(request, publisherId, data?: {}) {
    const userDetailsUrl = `${this.baseUrl}user/${publisherId}`;
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
    const reportsUrl = `${this.baseUrl}publisher_report_columns?user_id=${userId}&monetization_id=${monetizationId}`;
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
        return this.http.get(`${paymentMethodUrl}`);
      case 'put':
        return this.http.put(`${paymentMethodUrl}/${paymentMethodId}`, data);
      case 'post':
        return this.http.post(`${paymentMethodUrl}`, data);
    }
  }
  sitesDetails(method, siteId, data?: Site) {
    const siteUrl = `${this.baseUrl}sites/${siteId}`;
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
    return this.http.get<Publisher[]>(this.baseUrl + `publishers_search?&q=${query}`);
  }
  getOwnershipHistory(publisherId) {
    return this.http.get(`${this.baseUrl}query/ownership_history?publisher_id=${publisherId}`);
  }
  getPublisherLastLogin(username) {
    return this.http.get( `${this.baseUrl}query/user_last_login?username=${username}`);
  }
  getPublisherTagsBySiteId(siteId) {
    return this.http.get(`${this.baseUrl}query/site_tags?site_id=${siteId}`);
  }
  getPublisherSitesAndTags(publisherId) {
    return this.http.get(`${this.baseUrl}query/sites_tags?publisher_id=${publisherId}`);
  }
  getPublisherByAccountManager(account_manager_id) {
    return this.http.get(`${this.baseUrl}query/account_manager_publishers?account_manager_id=${account_manager_id}`);
  }
  getPaymentHistory(userId) {
    return this.http.get(`${this.baseUrl}payment_method_history?user_id=${userId}`);
  }
  getVerticals(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}verticals`).toPromise()
  }

  // CRUD REQUEST
  async postGoogleAuthentication(tokenId) {
    return await this.http.post(`${this.baseUrl}auth_google`, tokenId).toPromise();
  }
  updateOwnership(publisherId) {
    return this.http.post(`${this.baseUrl}publisher_account_manager_association?publisher_id=${publisherId}`, {});
  }
  updateBILive(tagId,live) {
    return this.http.put(`${this.baseUrl}bi_manual_data_live?tag_id=${tagId}&live=${live}`,{});
  }
  createUser(sendVerification, data) {
    return this.http.post(`${this.baseUrl}createuser?verification=${sendVerification}`, data)
  }
}
