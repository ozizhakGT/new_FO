import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvService} from "../../env.service";
import {Publisher} from "../../shared/interfaces/publisher.interface";

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


  getPublishers(query) {
    return this.http.get<Publisher[]>(this.baseUrl + `publishers_search?&q=${query}&${this.token}`);
  }

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

  getPublisherLastLogin(username) {
    return this.http.get( `${this.baseUrl}query/user_last_login?username=${username}`);
  }

  getPublisherTagsBySiteId(siteId) {
    return this.http.get(`${this.baseUrl}query/site_tags?site_id=${siteId}&${this.token}`)
  }

  getPaymentHistory(userId) {
    return this.http.get(`${this.baseUrl}payment_method_history?user_id=${userId}&${this.token}`)
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

  TakeOwnership(publusherId) {
    // @ts-ignore
    return this.http.post(`${this.baseUrl}publisher_account_manager_association?publisher_id=${publusherId}&${this.token}`, null  );
  }
  getOwnershipHistory(publisherId) {
    return this.http.get(`${this.baseUrl}query/ownership_history?publisher_id=${publisherId}&${this.token}`);
  }
}
