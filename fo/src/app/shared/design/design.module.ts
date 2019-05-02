import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatSelectModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatToolbarModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatToolbarModule
  ]
})
export class DesignModule { }
