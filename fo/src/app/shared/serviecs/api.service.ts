import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Publisher} from "../interfaces/publisher.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token = 'authenticationToken=ea5bc185-86d6-4455-8406-009d7726168c';
  baseUrl = 'http://api.adserver.web-pick.com/api/';
  constructor(private http: HttpClient) { }
/*
  GET REQUESTS
 */

  getPublishers(query) {
    return this.http.get<Publisher[]>(this.baseUrl + 'publishers_search?' + this.token + '&q=' + query);
  }
  getUserDetails(publisherId) {
    return this.http.get(this.baseUrl + 'user/' + publisherId + '?' + this.token);

  }

}
