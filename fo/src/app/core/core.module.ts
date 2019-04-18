// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModule } from './../shared/design/design.module';

// Components and Directives
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DesignModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
