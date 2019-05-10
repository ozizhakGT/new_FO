// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { DesignModule } from '../shared/design/design.module';

// Components and Directives
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SortByPipe } from './pipes/sort-by.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomeComponent,
    SortByPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    WelcomeComponent,
    SortByPipe
  ]
})
export class CoreModule { }
