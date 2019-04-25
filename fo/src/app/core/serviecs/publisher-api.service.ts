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
    return this.http.get<Publisher[]>(this.baseUrl + 'publishers_search?' + this.token + '&q=' + query);
  }

  async getOwnerById(id) {
    return await this.http.get<Publisher[]>(this.baseUrl + 'publishers_search?' + this.token + '&q=' + id).toPromise();
  }

  async getPublisherDetails(publisherId) {
    return await this.http.get<{}>(this.baseUrl + 'user/' + publisherId + '?' + this.token).toPromise();
  }

  async getPublisherLastLogin(username) {
    return await this.http.get(this.baseUrl + 'query/user_last_login?username=' + username).toPromise();
  }
}
