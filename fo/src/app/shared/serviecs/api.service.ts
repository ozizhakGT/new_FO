import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token = 'authenticationToken=8883ca0e-791c-48d7-903f-43ceb7801dee';
  baseUrl = 'http://api.adserver.web-pick.com/api/';
  constructor(private http: HttpClient) { }
/*
  GET REQUESTS
 */

  getPublisher(query) {
    return this.http.get(this.baseUrl + 'publishers_search?' + this.token + '&q=' + query);
  }
}
