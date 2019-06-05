import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TagsRoutingModule} from "./tags-routing.module";

import { NewTagComponent } from './new-tag/new-tag.component';
import { EditTagComponent } from './edit-tag/edit-tag.component';
import {TagsComponent} from "./tags.component";
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";
import {EditTagModule} from "./edit-tag/edit-tag.module";

@NgModule({
  declarations: [
    TagsComponent,
    NewTagComponent,

  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    TagsRoutingModule,
    EditTagModule
  ]
})
export class TagsModule { }
