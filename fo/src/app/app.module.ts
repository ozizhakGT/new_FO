// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from './core/core.module';
import {NgxSpinnerModule} from "ngx-spinner";

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components & Directives & Service
import { AppComponent } from './app.component';
import {EnvServiceProvider} from "./env.service.provider";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // NgxSpinnerModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
