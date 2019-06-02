import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalAuthService} from './auth.service';
import {UtilsService} from '../core/serviecs/utils.service';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  spinnerSubscription: Subscription;
  spinner = true;
  constructor(private auth: LocalAuthService, private utilsService: UtilsService, private router: Router) { }

  ngOnInit() {
    if (this.utilsService.onLocalStorageCheckExistKey('adminData')) {
      this.router.navigate(['publisher']);
    } else {
      this.spinner = false;
    }
    this.spinnerSubscription = this.auth.spinner.subscribe(
      isLoading => {
        this.spinner = isLoading;
      });
  }
  ngOnDestroy() {
    this.spinnerSubscription.unsubscribe();
  }

  signIn() {
    this.auth.socialSignIn();
  }
}
