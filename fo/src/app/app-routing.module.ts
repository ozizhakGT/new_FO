import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from "./core/welcome/welcome.component";

const routes: Routes = [
  {path: '', redirectTo: 'manage', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'sites', loadChildren: './sites/sites.module#SitesModule'},
  {path: 'tags', loadChildren: './tags/tags.module#TagsModule'},
  {path: 'manage', loadChildren: './management/management.module#ManagementModule'},
  {path: '**', redirectTo: 'welcome'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
