import {Component} from '@angular/core';
import {LocalAuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: LocalAuthService) {}

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
