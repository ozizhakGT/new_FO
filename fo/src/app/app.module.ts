// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from './core/core.module';
import {MatProgressBarModule} from "@angular/material";

// Routing
import { AppRoutingModule } from './app-routing.module';
import {AuthModule} from "./auth/auth.module";

// Components & Directives & Service
import { AppComponent } from './app.component';
import {EnvServiceProvider} from "./env.service.provider";
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angular5-social-login';
import {AuthGuard} from "./auth/auth.guard";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('704133860223-i4vo0qlrds4nlhsjcutgivvvaomnr27u.apps.googleusercontent.com')
      },
    ]
);
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    MatProgressBarModule
  ],
  providers: [
    EnvServiceProvider,
    AuthGuard,
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
