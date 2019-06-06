import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {EditTagComponent} from "./edit-tag.component";
import {EditTagRoutingModule} from "./edit-tag-routing.module";
import { PopComponent } from './components-opretion/pop/pop.component';

@NgModule({
  declarations: [
    EditTagComponent,
    PopComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    EditTagRoutingModule
  ]
})
export class EditTagModule { }
