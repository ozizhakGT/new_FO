import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AuthModule {}
