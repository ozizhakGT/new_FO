import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'dialog-change-password',
  templateUrl: 'dialog-change-password.component.html',
})
export class DialogChangePasswordComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {password: string}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
