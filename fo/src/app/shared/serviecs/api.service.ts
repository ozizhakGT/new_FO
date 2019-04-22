import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token = 'authenticationToken=9607a8e1-7362-4c61-a36b-d47667d81f0c';
  baseUrl = 'http://api.adserver.web-pick.com/api/';
  constructor(private http: HttpClient) { }
/*
  GET REQUESTS
 */

  getPublishers(query) {
    return this.http.get(this.baseUrl + 'publishers_search?' + this.token + '&q=' + query);
  }
  getPaymentDetails(publisherId) {
    this.http.get(this.baseUrl + 'user/' + publisherId + '?' + this.token)
      .subscribe(
        success => console.log(success)
      )
  }

}
