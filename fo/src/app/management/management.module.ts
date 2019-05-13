import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagementComponent} from './management.component';
import { NewPublisherComponent } from './new-publisher/new-publisher.component';
import { EditPublisherComponent } from './edit-publisher/edit-publisher.component';
import { AccountManagerAreaComponent } from './account-manager-area/account-manager-area.component';
import {ManagementRoutingModule} from './management-routing.module';
import {DesignModule} from '../shared/design/design.module';
import {CoreModule} from '../core/core.module';
import { PublisherDetailsComponent } from './edit-publisher/publisher-details/publisher-details.component';
import { PaymentDetailsComponent } from './edit-publisher/payment-details/payment-details.component';
import { DialogChangePasswordComponent } from './edit-publisher/publisher-details/dialog-change-password/dialog-change-password.component';
import { PublisherOwnershipHistoryComponent } from './edit-publisher/publisher-ownership-history/publisher-ownership-history.component';
import { PublisherSitesTagsComponent } from './edit-publisher/publisher-sites-tags/publisher-sites-tags.component';

@NgModule({
  declarations: [
    ManagementComponent,
    NewPublisherComponent,
    EditPublisherComponent,
    AccountManagerAreaComponent,
    PublisherDetailsComponent,
    PaymentDetailsComponent,
    DialogChangePasswordComponent,
    PublisherOwnershipHistoryComponent,
    PublisherSitesTagsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DesignModule,
    ManagementRoutingModule
  ],
  entryComponents: [DialogChangePasswordComponent]
})
export class ManagementModule { }
