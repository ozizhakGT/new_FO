import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Site} from "../../../../shared/interfaces/site.interface";

@Component({
  selector: 'app-edit-site-modal',
  templateUrl: './edit-site-modal.component.html',
  styleUrls: ['./edit-site-modal.component.css']
})
export class EditSiteModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditSiteModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {site: Site, verticals: any[]}) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
