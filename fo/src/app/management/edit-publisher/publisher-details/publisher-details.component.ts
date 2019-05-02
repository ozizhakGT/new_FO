import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {DialogChangePasswordComponent} from "./dialog-change-password/dialog-change-password.component";
import {userStatusArray, userTypeArray} from "../../enums/publisher-enums";
import {operationcategoriesArray} from "../../../core/general-enums/operation_categories";
import {ManagementService} from "../../management.service";
import {UtilsService} from "../../../core/serviecs/utils.service";

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {
  // PROMISE FOR GETTING USER STATE
  // MERGE SOME DATA FOR GENERAL DETAILS
  @Input() userDetails: Promise<any>;
  generalDetails;

  // OBSERVABLE FOR GETTING RELEVANT COLUMN REPORT BY MONETIZATION ID
  columnsReportObs;
  // SELECT ARRAY
  userTypes     = userTypeArray;
  userStatus    = userStatusArray;
  monetizations = operationcategoriesArray;

  // FORMS OBJECTS
  detailsForm       : FormGroup;
  reportColumnsForm : FormGroup;


  constructor(public dialog: MatDialog,
              private manageService: ManagementService,
              private utilsService: UtilsService) {}

  ngOnInit() {
    this.userDetails.then(
      userState => {
        let publisher = userState.details.publisher;
        console.log(userState);
        this.detailFormInit(publisher);
        this.generalDetails = {
          ...userState.details.lastLogin,
          owner: userState.details.owner,
          username: publisher.username,
          id: publisher.id,
          costExternalDate: publisher.cost_by_external_from_date
        };
      });
  }

  detailFormInit(publisher) {
      this.detailsForm = new FormGroup({
        'first_name': new FormControl(publisher.first_name),
        'last_name': new FormControl(publisher.last_name),
        'password': new FormControl(publisher.password),
        'account_type': new FormControl(publisher.account_type, Validators.required),
        'mode': new FormControl(publisher.mode, Validators.required),
        'outsource': new FormControl(publisher.outsource),
        'max_sites': new FormControl(publisher.max_sites, [Validators.required, Validators.min(-1)]),
        'max_tags_per_site': new FormControl(publisher.max_tags_per_site, [Validators.required, Validators.min(-1)]),
        'israeli': new FormControl(publisher.israeli),
        'cost_by_external': new FormControl(publisher.cost_by_external),
        'source_id': new FormControl(publisher.source_id),
      })
  }

  reportColumnsFormInit(report) {
    console.log(report)
    let cpm = report.columns.includes('cpm');
    let impressions = report.columns.includes('impressions');
    let country_code = report.columns.includes('country_code');

    this.reportColumnsForm = new FormGroup({
      'columns': new FormGroup({
        'cpm': new FormControl(cpm, Validators.required),
        'impressions': new FormControl(impressions, Validators.required),
        'country_code': new FormControl(country_code, Validators.required)
      }),
      'user_id': new FormControl(report.user_id),
      'monetization_id': new FormControl(report.monetization_id),
      'show_100_percent_revenue': new FormControl(report.show_100_percent_revenue),
      'impressions_shaving_percent': new FormControl(report.impressions_shaving_percent, [Validators.required, Validators.min(-1)])


    });

    console.log(this.reportColumnsForm.value)
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

  onToggle(fieldName,checked) {
    this.detailsForm.value[fieldName] = (checked) ? 1 : 0;
  }

  changeColorByStatus() {
    let status = this.detailsForm.value.mode;
    switch (status) {
      case 0:
        return 'orange';
      case 1:
        return 'green';
      case 2:
        return 'red';
      case 3:
        return 'grey';
    }
  }

  onGetReportColumns(monetizationId) {
    if (monetizationId) {
      this.columnsReportObs = this.manageService.getReportColumns(this.generalDetails.id, monetizationId);
      this.columnsReportObs.subscribe(
        report => {
          this.reportColumnsFormInit(report['message'].results[0]);
        });
    } else {
      this.reportColumnsForm.reset();
      this.columnsReportObs = '';
    }
  }

  saveUserDetails(form) {

    this.manageService.updateUserDetails(this.generalDetails.id, form.value)
      .subscribe(
       isUpdate => {
              this.utilsService.loader.next(true);
              if (isUpdate['type'] === 'updated') {
                this.utilsService.messageNotification('User Updated!', 'Let\'s Dance:)')
              }
              this.utilsService.loader.next(false);
            }
      )
  }
}
