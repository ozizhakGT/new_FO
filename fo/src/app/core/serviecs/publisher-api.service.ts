import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Publisher} from "../../shared/interfaces/publisher.interface";
import {EnvService} from "../../env.service";
import {Observable} from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class PublisherApiService {
  token = 'authenticationToken=ea345141-21cb-46f4-9916-c51e970831e6';
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

  getPublishers(query): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.baseUrl + 'publishers_search?' + this.token + '&q=' + query);
  }

  getPublisherDetails(publisherId): Observable<{}> {
    return this.http.get<{}>(this.baseUrl + 'user/' + publisherId + '?' + this.token);
  }

  getPublisherLastLogin(username) {
    return this.http.get(this.baseUrl + 'query/user_last_login?username=' + username);
  }
}
