import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SitesComponent} from './sites.component';
import {NewSiteComponent} from './new-site/new-site.component';
import {EditSiteComponent} from './edit-site/edit-site.component';

const sitesRoute: Routes = [
  {path: '', children: [
      {path: '', component: SitesComponent},
      {path: 'new', component: NewSiteComponent},
      {path: ':id/edit', component: EditSiteComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(sitesRoute)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
