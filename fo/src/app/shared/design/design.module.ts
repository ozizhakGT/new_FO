import { NgModule } from '@angular/core';
import {NgxSpinnerModule} from 'ngx-spinner';
import {
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatSelectModule,
  MatCardModule, MatProgressSpinnerModule
} from '@angular/material';


@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule
  ]
})
export class DesignModule { }
