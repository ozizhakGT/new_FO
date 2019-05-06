import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvService} from "../../env.service";
import {Publisher} from "../../shared/interfaces/publisher.interface";

@Injectable({
  providedIn: 'root'
})
export class PublisherApiService {
  token = 'authenticationToken=edd5eabf-73c8-4dda-b279-91563cc846a2';
  baseUrl = '';

  constructor(private env: EnvService, private http: HttpClient) {
    this.baseUrl = this.env.apiBEUrl;
    if (this.env.enableDebug) {
      console.log('debug mode enable');
    }
  }

  /*
    GET REQUESTS
   */

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
    return this.http.get(this.baseUrl + `query/user_last_login?username=${username}`);
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

  paymentMethods(request, userId) {
    const paymentMethodUrl = `${this.baseUrl}user/${userId}/payment_method?${this.token}`

    switch (request) {
      case 'get':
        return this.http.get(paymentMethodUrl);
    }
  }
}
