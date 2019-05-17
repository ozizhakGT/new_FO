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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    MatProgressBarModule
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
