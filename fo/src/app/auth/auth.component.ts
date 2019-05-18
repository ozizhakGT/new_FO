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
    this.spinner = true;
    // this.auth.getAdminState()
    //   .subscribe(
    //     userData => {
    //       if (userData != null) {
    //         debugger;
    //         const domain = userData.email.split('@')[1];
    //         if (this.auth.validateAuth(domain)) {
    //           this.router.navigate(['manage']);
    //         } else {
    //           this.utilsService.messageNotification(`Your Email is Not Admin In This System !`, null, 'failed');
    //           this.utilsService.onLocalStorageRemove('adminData');
    //         }
    //       } else {
    //         this.spinner = false;
    //       }
    //     });
  }
  signIn() {
    this.auth.socialSignIn(this.spinner);
  }

}
