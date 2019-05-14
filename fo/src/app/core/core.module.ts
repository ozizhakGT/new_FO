// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

// Components and Directives
import { HeaderComponent } from './header/header.component';
import { SortByPipe } from './pipes/sort-by.pipe';

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
  ]
})
export class CoreModule { }
