import { Injectable } from '@angular/core';
import {AuthService, GoogleLoginProvider} from "angular5-social-login";
import {UtilsService} from "../core/serviecs/utils.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LocalAuthService {
  allowedDomains: string[] = ['web-pick.com', 'ad-maven.com'];
  token = JSON.parse(this.utilsService.onLocalStorageGet('userLoggedIn'));
  constructor(private socialAuthService: AuthService, private utilsService: UtilsService, private router: Router) { }

  socialSignIn() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        let domain = userData.email.split('@')[1];
        debugger;
        if (this.validateAuth(domain)) {
          this.utilsService.onLocalStorageSet('userLoggedIn', JSON.stringify({token: userData.idToken}))
          this.router.navigate(['manage']);
        }
      }
    );
  }

  getAdminState() {
    return this.socialAuthService.authState;
  }

  validateAuth(domain) {
    return this.allowedDomains.includes(domain);
  }

  isAuthenticated() {
    return this.token !== null;
  }
}
