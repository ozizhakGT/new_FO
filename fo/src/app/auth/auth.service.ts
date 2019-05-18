import { Injectable } from '@angular/core';
import {AuthService, GoogleLoginProvider} from "angular5-social-login";
import {UtilsService} from "../core/serviecs/utils.service";
import {Router} from "@angular/router";
import {ApiService} from "../core/serviecs/api.service";

@Injectable({
  providedIn: 'root'
})
export class LocalAuthService {
  allowedDomains: string[] = ['web-pick.com', 'ad-maven.com'];
  token;
  constructor(private socialAuthService: AuthService,
              private utilsService: UtilsService,
              private apiService: ApiService,
              private router: Router) { }

  socialSignIn(spinner) {
    spinner = true;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        let domain = userData.email.split('@')[1];
        if (this.validateAuth(domain)) {
          this.getAdminDetails(userData.idToken);
          this.router.navigate(['manage']);
          this.utilsService.messageNotification(`Welcome Back ${userData.name}!`, null, 'success');
          spinner = false;
        } else {
          this.utilsService.messageNotification(`Your Email is Not Admin In This System !`, null, 'failed');
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
    this.getAdminState()
      .subscribe(
        userData => {
          if (userData != null) {
            debugger;
            const domain = userData.email.split('@')[1];
            if (this.validateAuth(domain)) {
              this.router.navigate(['manage']);
            } else {
              this.utilsService.messageNotification(`Your Email is Not Admin In This System !`, null, 'failed');
              localStorage.removeItem('adminData');
            }
          } else {
            localStorage.removeItem('adminData');
            this.router.navigate(['login']);
          }
        });
  }

  getAdminDetails(tokenId) {
    const admin = `token=${tokenId}`
    this.apiService.postGoogleAthentication(admin).toPromise()
      .then(response => {
        if (response['type'] === 'created') {
          this.utilsService.onLocalStorageSet('adminData', JSON.stringify(response['message']))
        }
      });
  }
}
