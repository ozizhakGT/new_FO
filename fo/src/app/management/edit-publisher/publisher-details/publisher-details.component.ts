import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {DialogChangePasswordComponent} from "./dialog-change-password/dialog-change-password.component";
import {userStatusArray, userTypeArray} from "../../enums/publisher-enums";

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {
  userTypes = userTypeArray;
  userStatus = userStatusArray;
  @Input() userDetails: Promise<any>;
  detailsForm: FormGroup;
  generalDetails;


  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.userDetails.then(
      userState => {
        let publisher = userState.details.publisher;
        console.log(userState);
        this.formInit(publisher);
        this.generalDetails = {
          ...userState.details.lastLogin,
          owner: userState.details.owner,
          username: publisher.username,
          costExternalDate: publisher.cost_by_external_from_date
        };
      })
    // this.formInit(this.userDetails);
  }

  formInit(publisher) {
      this.detailsForm = new FormGroup({
        'first_name': new FormControl(publisher.first_name),
        'last_name': new FormControl(publisher.last_name),
        'password': new FormControl(publisher.password),
        'account_type': new FormControl(publisher.account_type),
        'mode': new FormControl(publisher.mode),
        'outsource': new FormControl(publisher.outsource),
        'max_sites': new FormControl(publisher.max_sites),
        'max_tags_per_site': new FormControl(publisher.max_tags_per_site),
        'cost_by_external': new FormControl(publisher.cost_by_external),
      })
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '250px',
      data: {password: this.detailsForm.value.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.detailsForm.value.password = result;
      console.log(this.detailsForm.value)
    });
  }

  onToggle(fieldName,toggleBtn) {
    debugger
    fieldName = toggleBtn.checked ? 0 : 1;
    console.log(fieldName)
  }
}
