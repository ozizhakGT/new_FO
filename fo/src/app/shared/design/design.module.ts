import { NgModule } from '@angular/core';
import {MatButtonModule, MatMenuModule, MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatTabsModule} from '@angular/material';
// import {MatTabsModule} from "@angular/material/typings/tabs";


@NgModule({
  imports: [
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ]
})
export class DesignModule { }
