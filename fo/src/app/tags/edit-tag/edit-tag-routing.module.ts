import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditTagComponent} from './edit-tag.component';
import {PopComponent} from './components-opretion/pop/pop.component';
import {EnumsResolverService} from "../../core/serviecs/enums-resolver.service";

const editTagRouting: Routes = [
  {path: '', component: EditTagComponent, children: [
      {path: ':tagId/operation', children: [
          {path: '2', component: PopComponent}
        ]}
    ], resolve: {enums: EnumsResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(editTagRouting)],
  exports: [RouterModule]
})

export class EditTagRoutingModule {}
