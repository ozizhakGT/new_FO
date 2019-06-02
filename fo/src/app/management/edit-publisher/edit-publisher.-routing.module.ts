import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditPublisherComponent} from './edit-publisher.component';
import {PublisherDetailsComponent} from './publisher-details/publisher-details.component';
import {PaymentDetailsComponent} from './payment-details/payment-details.component';
import {PublisherOwnershipHistoryComponent} from './publisher-ownership-history/publisher-ownership-history.component';
import {PublisherSitesTagsComponent} from './publisher-sites-tags/publisher-sites-tags.component';

const editPublisherRoutes: Routes = [
  {path: '', component: EditPublisherComponent, children: [
      {path: ':publisherId', children: [
          {path: '', redirectTo: 'details', pathMatch: ''},
          {path: 'details', component: PublisherDetailsComponent},
          {path: 'payments', component: PaymentDetailsComponent},
          {path: 'ownership', component: PublisherOwnershipHistoryComponent},
          {path: 'sites', component: PublisherSitesTagsComponent},
        ]},
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(editPublisherRoutes)
  ],
  exports: [RouterModule]
})

export class EditPublisherRoutingModule {}
