import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ManagementComponent} from "./management.component";
import {NewPublisherComponent} from "./new-publisher/new-publisher.component";
import {EditPublisherComponent} from "./edit-publisher/edit-publisher.component";
import {AccountManagerAreaComponent} from "./account-manager-area/account-manager-area.component";

const managementRoutes: Routes = [
  {path: '', component: ManagementComponent, children: [
      {path: '', redirectTo: 'my-area', pathMatch: 'full'},
      {path: 'new', component: NewPublisherComponent},
      {path: ':publisherId/edit', component: EditPublisherComponent},
      {path: 'my-area', component: AccountManagerAreaComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(managementRoutes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
