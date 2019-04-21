import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TagsRoutingModule} from "./tags-routing.module";

import { NewTagComponent } from './new-tag/new-tag.component';
import { EditTagComponent } from './edit-tag/edit-tag.component';
import {TagsComponent} from "./tags.component";

@NgModule({
  declarations: [
    TagsComponent,
    NewTagComponent,
    EditTagComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule
  ]
})
export class TagsModule { }
