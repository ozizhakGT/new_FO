import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material";

import {ManagementService} from "../../management.service";
import {UtilsService} from "../../../core/serviecs/utils.service";

import {DialogChangePasswordComponent} from "./dialog-change-password/dialog-change-password.component";

import {userStatusStructure, userTypeStructure} from "../../enums/publisher-enums";
import {operationcategoriesArray} from "../../../core/general-enums/operation_categories";


@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {
  // PROMISE FOR GETTING USER STATE
  // MERGE SOME DATA FOR GENERAL DETAILS
  @Input() userState: Promise<any>;
  generalDetails;

  // OBSERVABLE FOR GETTING RELEVANT COLUMN REPORT BY MONETIZATION ID
  columnsReportObs;
  // SELECT ARRAY
  userTypes     = userTypeStructure;
  userStatus    = userStatusStructure;
  monetizations = operationcategoriesArray;

  // Local Spinner
  spinner: boolean = false;

  // FORMS OBJECTS
  detailsForm       : FormGroup;
  reportColumnsForm : FormGroup;


  constructor(public dialog: MatDialog,
              private manageService: ManagementService,
              private utilsService: UtilsService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.userState.then(
      userState => {
        let publisher = userState.details.publisher;
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
    let cpm = report.columns.includes('cpm');
    let impressions = report.columns.includes('impressions');
    let country_code = report.columns.includes('country_code');

    this.reportColumnsForm = new FormGroup({
      'columns': new FormGroup({
        'cpm': new FormControl(cpm, Validators.required),
        'impressions': new FormControl(impressions, Validators.required),
        'country_code': new FormControl(country_code, Validators.required)
      }),
      'user_id': new FormControl(parseInt(report.user_id)),
      'monetization_id': new FormControl(parseInt(report.monetization_id)),
      'show_100_percent_revenue': new FormControl(report.show_100_percent_revenue),
      'impressions_shaving_percent': new FormControl(report.impressions_shaving_percent, [Validators.required, Validators.min(0), Validators.max(100)])
    });
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

  onToggle(form, fieldName, checked) {
    if (form.columns) {
      form.columns[fieldName] = (checked) ? true : false;
    } else {
      form[fieldName] = (checked) ? 1 : 0;
    }
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

  deleteUser() {
    this.spinner = true;
    if(confirm(`Are you sure you want Deleting ${this.generalDetails.username} ?`)) {
      this.manageService.deleteUser(this.generalDetails.id)
        .then(
          response => {
            if (response['type'] === 'deleted') {
              this.utilsService.messageNotification('User Deleted', null, 'success');
              this.utilsService.onSessionStorageRemove('publisherId');
              this.router.navigate(['../'], {relativeTo: this.route});
            }
          })
        .catch(err => {
          this.utilsService.messageNotification('Failed Deleting User!', null, 'failed');
        })
        .finally(() => this.spinner = false)
    }
    else {
      this.spinner = false;
    }
  }

  saveUserDetails(form) {
    this.spinner = true;
     this.manageService.updateUserDetails(this.generalDetails.id, form.value)
      .then(
        response => {
          if (response['type'] === 'updated') {
              this.utilsService.messageNotification('User Updated!', null, 'success');
          }
        }
      )
       .catch(err => {
         this.utilsService.messageNotification('Failed Update User!', null, 'failed');
       })
       .finally(() => this.spinner = false);
  }

  saveReportColumn(form) {
      this.spinner = true;
      let finalReport = this.manageService.fixReportColumn(form.value);
      this.manageService.postReportColumn(finalReport.user_id, finalReport.monetization_id, finalReport)
        .then(
          response => {
            if (response['type'] === "created") {
              this.utilsService.messageNotification('Report Created!', null, 'success');
            }})
        .catch(err => {
              console.log(err);
              this.utilsService.messageNotification('Failed Create Report!', null, 'failed');
        })
        .finally(() => this.spinner = false);
  }

  /*
  * TODO: NEED TO COMPARE CLIENT AND OWNER IF THEM THE SAME POP UP MESSAGE AND DONT SEND THIS REQUEST!
  * */
  takeOwner(publisherId, username) {
    let owner = JSON.parse(localStorage.getItem('adminData')).username;
    if (publisherId) {
      if (this.generalDetails.owner === owner) {
        this.utilsService.messageNotification(`You already Publisher's Owner!`, null, 'info')
      } else {
        this.spinner = true;
        if (confirm(`are you sure you want taking ownership on ${username}`)) {
          this.manageService.postTakeOwner(publisherId)
            .then(response => {
              if (response['type'] === 'created') {
                this.utilsService.messageNotification(`You take Ownership on ${username} successfully!`, null, 'success');
                this.generalDetails.owner = owner;
              }
            })
            .catch(() => this.utilsService.messageNotification(`Couldn't take Ownership`, null, 'failed'))
            .finally(() => this.spinner = false);
        } else {
          this.spinner = false;
        }
      }
    }
  }

  /*
  * TODO: AFTER FINISHING MY AREA COMPONENT NEED TO TAKE NAME ADMIN AND PUT IT HERE
  * !!!! NOT GOOD SOLUTION !!
  * */
  onGetPresentOwner(publisherId) {
    this.manageService.getUser(publisherId)
      .then(
        response => {
          if (typeof response['message'].results[0].account_manager_id === 'number') {
            this.manageService.getUser(response['message'].results[0].account_manager_id)
              .then(
                response => {
                  this.generalDetails.owner = response['message'].results[0].username;
                }
              )
          }
        }
      )
  }
}
