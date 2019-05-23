import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ManagementComponent} from "./management.component";
import {NewPublisherComponent} from "./new-publisher/new-publisher.component";
import {EditPublisherComponent} from "./edit-publisher/edit-publisher.component";
import {AccountManagerAreaComponent} from "./account-manager-area/account-manager-area.component";
import {AdminResolverService} from "../core/serviecs/admin-resolver.service";

const managementRoutes: Routes = [
  {path: '', component: ManagementComponent, children: [
      {path: '', redirectTo: 'my-area', pathMatch: 'full'},
      {path: 'my-area', component: AccountManagerAreaComponent, resolve: {adminDetails: AdminResolverService}},
      {path: 'new', component: NewPublisherComponent},
      {path: 'edit', children: [
          {path: '', component: EditPublisherComponent},
          {path: ':publisherId', component: EditPublisherComponent}
        ]},
      {path: 'my-area', component: AccountManagerAreaComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(managementRoutes)],
  exports: [RouterModule],
  providers: [AdminResolverService]
})
export class ManagementRoutingModule {}
