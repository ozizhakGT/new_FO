import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EditTagComponent} from "./edit-tag.component";
import {PopComponent} from "./components-opretion/pop/pop.component";

const editTagRouting: Routes = [
  {path: '', component: EditTagComponent, children: [
      {path: ':tagId/operation', children: [
          {path: '2', component: PopComponent}
        ]}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(editTagRouting)],
  exports: [RouterModule]
})

export class EditTagRoutingModule {}
