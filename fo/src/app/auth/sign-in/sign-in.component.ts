import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': false,
      'theme': 'dark',
      'onsuccess': param => this.onSignIn(param)
    });
  }

  public onSignIn(googleUser) {
    var user : User = new User();

    ((u, p) => {
      u.id            = p.getId();
      u.name          = p.getName();
      u.email         = p.getEmail();
      u.imageUrl      = p.getImageUrl();
      u.givenName     = p.getGivenName();
      u.familyName    = p.getFamilyName();
    })(user, googleUser.getBasicProfile());

    ((u, r) => {
      u.token         = r.id_token;
    })(user, googleUser.getAuthResponse());

    user.save();
    this.goHome();
  };

}
