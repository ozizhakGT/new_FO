import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditPublisherRoutingModule} from "./edit-publisher.-routing.module";
import {EditPublisherComponent} from "./edit-publisher.component";
import {PublisherDetailsComponent} from "./publisher-details/publisher-details.component";
import {PaymentDetailsComponent} from "./payment-details/payment-details.component";
import {PublisherOwnershipHistoryComponent} from "./publisher-ownership-history/publisher-ownership-history.component";
import {PublisherSitesTagsComponent} from "./publisher-sites-tags/publisher-sites-tags.component";
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";
import {EditSiteModalComponent} from "./publisher-sites-tags/edit-site-modal/edit-site-modal.component";
import {DialogChangePasswordComponent} from "./publisher-details/dialog-change-password/dialog-change-password.component";

@NgModule({
  declarations: [
    EditPublisherComponent,
    PublisherDetailsComponent,
    PaymentDetailsComponent,
    PublisherOwnershipHistoryComponent,
    PublisherSitesTagsComponent,
    DialogChangePasswordComponent,
    EditSiteModalComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    EditPublisherRoutingModule
  ],
  entryComponents: [EditSiteModalComponent, DialogChangePasswordComponent]
})
export class EditPublisherModule { }
