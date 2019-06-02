import { Injectable } from '@angular/core';
import {AuthService, GoogleLoginProvider} from "angular5-social-login";
import {UtilsService} from "../core/serviecs/utils.service";
import {Router} from "@angular/router";
import {ApiService} from "../core/serviecs/api.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalAuthService {
  spinner = new Subject<boolean>();
  allowedDomains: string[] = ['web-pick.com', 'ad-maven.com'];
  constructor(private socialAuthService: AuthService,
              private utilsService: UtilsService,
              private apiService: ApiService,
              private router: Router) { }

  async socialSignIn() {
    this.spinner.next(true);
   await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        let domain = userData.email.split('@')[1];
        if (this.validateAuth(domain)) {
        this.getAdminDetails(userData.idToken, userData);
        } else {
          this.utilsService.messageNotification(`This is Not Email Organization Allowd !`, null, 'failed');
          this.spinner.next(false);
        }
      });
  }

  getAdminData() {
    return localStorage.getItem('adminData');
  }

  validateAuth(domain) {
    return this.allowedDomains.includes(domain);
  }

  isAuthenticated() {
      const adminData = this.getAdminData();
      return adminData !== null;
  }

  getAdminDetails(tokenId, userData) {
    const admin = `token=${tokenId}`;
    this.apiService.postGoogleAuthentication(admin)
      .then(response => {
        if (response['type'] === 'created' && response['message'].account_type == 0) {
          localStorage.setItem('userDetails',JSON.stringify(userData));
          this.utilsService.messageNotification(`Welcome Back ${userData.name}!`, null, 'success');
          localStorage.setItem('adminData', JSON.stringify(response['message']));
          this.router.navigate(['publisher']);
        }
      }).catch(err => {
        if (err['status'] === 401) {
          this.utilsService.messageNotification(`It's Look like You are not Admin !`, null, 'failed');
        }
    });
  }
}
