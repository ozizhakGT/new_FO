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
  MatCardModule, MatProgressSpinnerModule, MatProgressBarModule, MatTooltipModule
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
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule
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
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class DesignModule { }
