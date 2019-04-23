import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TagsComponent} from "./tags.component";
import {NewTagComponent} from "./new-tag/new-tag.component";
import {EditTagComponent} from "./edit-tag/edit-tag.component";

const tagsRoute: Routes = [
  {path: '', component: TagsComponent, children: [
      {path: 'new', children: [
          {path: '', component: NewTagComponent},
          {path: ':publisherId', component: NewTagComponent}
        ]},
      {path: 'edit', children: [
          {path: '', component: EditTagComponent},
          {path: ':tagId', component: EditTagComponent}
        ]},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(tagsRoute)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
