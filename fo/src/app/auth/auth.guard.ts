import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';

import {LocalAuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: LocalAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login'])
      return false;
    };
    return true
  }
}
