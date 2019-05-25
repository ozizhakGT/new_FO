import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ManagementService} from '../management.service';
import {UtilsService} from '../../core/serviecs/utils.service';

import {userStatusArray} from '../enums/publisher-enums';

@Component({
  selector: 'app-account-manager-area',
  templateUrl: './account-manager-area.component.html',
  styleUrls: ['./account-manager-area.component.css']
})
export class AccountManagerAreaComponent implements OnInit {
  admin: any[] =  [];
  publishers;
  userStatus = userStatusArray;
  displayedColumns: string[] = ['username', 'id', 'mode'];
  sendData = false;
  constructor(private utilsService: UtilsService, private manageService: ManagementService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(res => {
      this.admin = res['adminDetails'];
    });
    this.manageService.getAccountManagerPublishers(this.admin['id'])
      .then(
        response => {
          this.publishers = response['message'].results;
          this.utilsService.loader.next(false);
        });
  }

  // onInitForm(form) {
  //
  // }

  onUpdate(form) {
  this.sendData = true;
  let formValue = form.value;
  this.manageService.updateUserDetails(this.admin['id'], formValue)
    .then(response => {
        this.utilsService.messageNotification('Your Details Change Successfully !', null, 'success');
        this.sendData = false;
      })
    .catch(err=> {
      this.utilsService.messageNotification('There was Problem Update Details', null, 'failed');
      this.sendData = false;
    });
  }
}
