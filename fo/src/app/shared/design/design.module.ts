import { NgModule } from '@angular/core';
import {MatButtonModule, MatMenuModule, MatInputModule, MatFormFieldModule, MatAutocompleteModule} from '@angular/material';


@NgModule({
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ]
})
export class DesignModule { }
