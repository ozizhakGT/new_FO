import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {LocalAuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminResolverService implements Resolve<any> {

  constructor()  {}
  resolve(route: ActivatedRouteSnapshot) {
    return localStorage.getItem('adminData')
  }
}
