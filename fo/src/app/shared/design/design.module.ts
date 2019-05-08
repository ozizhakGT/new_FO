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
  MatToolbarModule,
  MatSnackBarModule,
  MatTableModule,
  MatExpansionModule
} from '@angular/material';
import {NgxPaginationModule} from "ngx-pagination";


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
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    MatExpansionModule,
    NgxPaginationModule
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
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    MatExpansionModule,
    NgxPaginationModule
  ]
})
export class DesignModule { }
