import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EditTagComponent} from "./edit-tag.component";
import {BannerComponent} from "./components-opretion/banner/banner.component";

const editTagRouting: Routes = [
  {path: '', component: EditTagComponent, children: [
      {path: 'operation', children: [
          {path: 'banner', component: BannerComponent}
        ]}
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(editTagRouting)],
  exports: [RouterModule]
})

export class EditTagRoutingModule {}
