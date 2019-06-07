import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {ManagementService} from '../../management.service';
import {UtilsService} from '../../../core/serviecs/utils.service';

import {DialogChangePasswordComponent} from './dialog-change-password/dialog-change-password.component';

import {userStatusStructure, userTypeStructure} from '../../enums/publisher-enums';
import {operationcategoriesArray} from '../../../core/general-enums/operation_categories';


@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {
  // MERGE SOME DATA FOR GENERAL DETAILS
  generalDetails;

  // OBSERVABLE FOR GETTING RELEVANT COLUMN REPORT BY MONETIZATION ID
  columnsReportObs;
  // SELECT ARRAY
  userTypes     = userTypeStructure;
  userStatus    = userStatusStructure;
  monetizations = operationcategoriesArray;

  // Local Spinner
  spinner = false;

  // FORMS OBJECTS
  detailsForm: FormGroup;
  reportColumnsForm: FormGroup;


  constructor(public dialog: MatDialog,
              private manageService: ManagementService,
              private utilsService: UtilsService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        this.detailsForm = undefined;
        this.utilsService.loader.next(true);
        this.getUser(params['publisherId'])
      });
  }
  getUser(publisherId) {
    this.manageService.getUser(publisherId).then(
      publisher => {
        const publisherDetails = publisher.message.results[0];
        this.detailFormInit(publisherDetails);
        this.generalDetails = {
          username: publisherDetails.username,
          id: publisherDetails.id,
          owner_id: publisherDetails.account_manager_id
        };
        this.utilsService.loader.next(false);
      })
      .catch(err => {
        console.log(err)
        this.utilsService.messageNotification(`Cannot get Data!`, null, 'failed')
        this.utilsService.loader.next(false);
      });
  }
  detailFormInit(publisher) {
      this.detailsForm = new FormGroup({
        first_name: new FormControl(publisher.first_name),
        last_name: new FormControl(publisher.last_name),
        password: new FormControl(publisher.password),
        account_type: new FormControl(publisher.account_type, Validators.required),
        mode: new FormControl(publisher.mode, Validators.required),
        outsource: new FormControl(publisher.outsource),
        max_sites: new FormControl(publisher.max_sites, [Validators.required, Validators.min(-1)]),
        max_tags_per_site: new FormControl(publisher.max_tags_per_site, [Validators.required, Validators.min(-1)]),
        israeli: new FormControl(publisher.israeli),
        bitcoin_allowed: new FormControl(publisher.bitcoin_allowed),
        cost_by_external: new FormControl(publisher.cost_by_external),
        source_id: new FormControl(publisher.source_id),
      });
  }

  reportColumnsFormInit(report) {
    const cpm = report.columns.includes('cpm');
    const impressions = report.columns.includes('impressions');
    const country_code = report.columns.includes('country_code');

    this.reportColumnsForm = new FormGroup({
      columns: new FormGroup({
        cpm: new FormControl(cpm, Validators.required),
        impressions: new FormControl(impressions, Validators.required),
        country_code: new FormControl(country_code, Validators.required)
      }),
      user_id: new FormControl(parseInt(report.user_id)),
      monetization_id: new FormControl(parseInt(report.monetization_id)),
      show_100_percent_revenue: new FormControl(report.show_100_percent_revenue),
      impressions_shaving_percent: new FormControl(report.impressions_shaving_percent, [Validators.required, Validators.min(0), Validators.max(100)])
    });
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '250px',
      data: {password: this.detailsForm.value.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.detailsForm.value.password = result;
      console.log(this.detailsForm.value);
    });
  }

  onToggle(form, fieldName, checked) {
    if (form.columns) {
      form.columns[fieldName] = (checked) ? true : false;
    } else {
      form[fieldName] = (checked) ? 1 : 0;
    }
  }
  onGetReportColumns(monetizationId) {
    if (monetizationId) {
      this.columnsReportObs = this.manageService.getReportColumns(this.generalDetails.id, monetizationId);
      this.columnsReportObs.subscribe(
        report => {
          this.reportColumnsFormInit(report.message.results[0]);
        });
    } else {
      this.reportColumnsForm.reset();
      this.columnsReportObs = '';
    }
  }

  deleteUser() {
    this.spinner = true;
    if (confirm(`Are you sure you want Deleting ${this.generalDetails.username} ?`)) {
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
        .finally(() => this.spinner = false);
    } else {
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
      const finalReport = this.manageService.fixReportColumn(form.value);
      this.manageService.postReportColumn(finalReport.user_id, finalReport.monetization_id, finalReport)
        .then(
          response => {
            if (response['type'] === 'created') {
              this.utilsService.messageNotification('Report Created!', null, 'success');
            }})
        .catch(err => {
              console.log(err);
              this.utilsService.messageNotification('Failed Create Report!', null, 'failed');
        })
        .finally(() => this.spinner = false);
  }

  sendNewMode(mode) {
    this.manageService.modeStatus.next(mode);
  }

  /*
  * TODO: NEED TO COMPARE CLIENT AND OWNER IF THEM THE SAME POP UP MESSAGE AND DONT SEND THIS REQUEST!
  * */
  takeOwner(publisherId, username) {
    const ownerId = JSON.parse(localStorage.getItem('adminData')).id;
    if (publisherId) {
      if (this.generalDetails.owner_id == ownerId) {
        this.utilsService.messageNotification(`You already Publisher's Owner!`, null, 'info');
      } else {
        this.spinner = true;
        if (confirm(`are you sure you want taking ownership on ${username}`)) {
          this.manageService.postTakeOwner(publisherId)
            .then(response => {
              if (response['type'] === 'created') {
                this.manageService.repalceOwner.next(JSON.parse(localStorage.getItem('adminData')).username);
                this.utilsService.messageNotification(`You take Ownership on ${username} successfully!`, null, 'success');
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
}
