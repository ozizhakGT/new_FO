import { NgModule } from '@angular/core';
import {MatButtonModule, MatMenuModule} from "@angular/material";


@NgModule({
  imports: [
    MatMenuModule,
    MatButtonModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule
  ]
})
export class DesignModule { }
