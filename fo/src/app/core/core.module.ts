// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { DesignModule } from '../shared/design/design.module';

// Components and Directives
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    DesignModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    WelcomeComponent
  ]
})
export class CoreModule { }
