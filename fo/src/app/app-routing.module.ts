import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
  {path: 'tags', loadChildren: './tags/tags.module#TagsModule', canActivate: [AuthGuard]},
  {path: 'publisher', loadChildren: './management/management.module#ManagementModule', canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'welcome'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
