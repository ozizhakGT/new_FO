import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SitesComponent} from './sites.component';
import {NewSiteComponent} from './new-site/new-site.component';
import {EditSiteComponent} from './edit-site/edit-site.component';

const sitesRoute: Routes = [
  {path: '', component: SitesComponent, children: [
      {path: '', redirectTo: 'new', pathMatch: 'full'},
      {path: ':publisherId/new', component: NewSiteComponent},
      {path: ':siteId/edit', component: EditSiteComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(sitesRoute)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
