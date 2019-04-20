import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSiteComponent } from './new-site/new-site.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import {SitesRoutingModule} from "./sites.-routing.module";
import {SitesComponent} from "./sites.component";

@NgModule({
  declarations: [
    SitesComponent,
    NewSiteComponent,
    EditSiteComponent
  ],
  imports: [
    CommonModule,
    SitesRoutingModule
  ]
})
export class SitesModule { }
