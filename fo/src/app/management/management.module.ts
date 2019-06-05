import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagementComponent} from './management.component';
import { NewPublisherComponent } from './new-publisher/new-publisher.component';
import { AccountManagerAreaComponent } from './account-manager-area/account-manager-area.component';
import {ManagementRoutingModule} from './management-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {EditPublisherModule} from "./edit-publisher/edit-publisher.module";

@NgModule({
  declarations: [
    ManagementComponent,
    NewPublisherComponent,
    AccountManagerAreaComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ManagementRoutingModule,
    EditPublisherModule
  ]
})
export class ManagementModule { }
