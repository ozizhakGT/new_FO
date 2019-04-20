import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token = 'authenticationToken=db6357e8-3b1c-4742-afed-4f416f80d9f7';
  baseUrl = 'http://api.adserver.web-pick.com/api/';
  constructor(private http: HttpClient) { }
/*
  GET REQUESTS
 */

  getPublisher(query) {
    return this.http.get(this.baseUrl + 'publishers_search?' + this.token + '&q=' + query);
  }
}
