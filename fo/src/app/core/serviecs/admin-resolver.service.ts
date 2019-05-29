import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ApiService} from "./api.service";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class AdminResolverService implements Resolve<any> {
  user;
  constructor(private utilsService: UtilsService, private apiService: ApiService)  {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.utilsService.loader.next(true);
    const admin = JSON.parse(localStorage.getItem('adminData'));
    this.user = await this.apiService.UserDetailRequests('get', admin['id']).toPromise()
      .then( res => this.user = res['message'].results[0]);
    return this.user;
  }
}
