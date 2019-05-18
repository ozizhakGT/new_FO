import {Component, OnInit} from '@angular/core';
import {LocalAuthService} from './auth.service';
import {UtilsService} from '../core/serviecs/utils.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  spinner: boolean = false;
  constructor(private auth: LocalAuthService, private utilsService: UtilsService, private router: Router) { }

  ngOnInit() {
    let token = JSON.parse(this.utilsService.onLocalStorageGet('userLoggedIn'));
    if (token.hasOwnProperty('token')) {
      return this.router.navigate(['manage']);
    }
      this.auth.getAdminState()
        .subscribe(response => {
          if (response !== null) {
            this.spinner = true;
            let domain = response.email.split('@')[1];
            if (this.auth.validateAuth(domain)) {
              debugger;
              console.log(response)
              this.utilsService.messageNotification(`Welcome Back ${response.name}!`, null, 'success');
              this.spinner = false;
              this.router.navigate(['manage']);
            } else {
              this.utilsService.messageNotification('You Are not Admin User!', null, 'failed');
            }
          }
        });
  }
  signIn() {
    this.auth.socialSignIn();
  }

}
