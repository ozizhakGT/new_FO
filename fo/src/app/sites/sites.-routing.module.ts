import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SitesComponent} from './sites.component';
import {NewSiteComponent} from './new-site/new-site.component';
import {EditSiteComponent} from './edit-site/edit-site.component';

const sitesRoute: Routes = [
  {path: '', component: SitesComponent, children: [
      {path: '', redirectTo: 'new', pathMatch: 'full'},
      {path: 'new', children: [
          {path: '', component: NewSiteComponent},
          {path: ':publisherId', component: NewSiteComponent}
        ]},
      {path: 'edit', children: [
          {path: '', component: EditSiteComponent},
          {path: ':siteId', component: EditSiteComponent}
        ]},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(sitesRoute)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
