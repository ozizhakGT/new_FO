// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

// Components and Directives
import { HeaderComponent } from './header/header.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import {AuthServiceConfig} from "angular5-social-login";
import {getAuthServiceConfigs} from "../app.module";
import {HttpInterseptorService} from "./serviecs/http-interseptor.service";

@NgModule({
  declarations: [
    HeaderComponent,
    SortByPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    SortByPipe
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterseptorService, multi: true}
  ]
})
export class CoreModule { }
