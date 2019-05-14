import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params, Router} from "@angular/router";

import {UtilsService} from "../../core/serviecs/utils.service";
import {ManagementService} from "../management.service";

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css']
})
export class EditPublisherComponent implements OnInit {
  isValidPublisher: boolean;
  userState: Promise<any>;

  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private route: ActivatedRoute,
              private router: Router) { }

  async ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        console.log(params['publisherId'])
        const id = params['publisherId'];
        if (id && id !== 'undefined') {
          this.userState = this.onGetuserStateDetails(id);
          this.isValidPublisher = true;
        } else {
          this.router.navigate(['../'], {relativeTo:this.route});
          this.isValidPublisher = false;
        }
      });
  }

  async onGetuserStateDetails(id) {
    let fetchPromiseArr: Promise<any>[] = [];
    this.utilsService.loader.next(true);
    // userState state Data structre
    let userState = {
      details: {
        publisher: null,
        lastLogin: null,
        owner: null
      },
      paymentsMethods: null,
      paymentsHistory: null,
      ownershipHistory: null,
      sites: JSON.parse(this.utilsService.onSessionStorageLoad('publisherSites'))
    };
    // get user request
    userState.details.publisher = await this.manageService.getUser(id);
    userState.details.publisher = userState.details.publisher['message'].results[0];

    if (userState.details.publisher) {
      userState.details.lastLogin = this.manageService.getLastLogin(userState.details.publisher.username)
        .then(response => {
          userState.details.lastLogin = response['message'].results[0];
        });
      fetchPromiseArr.push(userState.details.lastLogin);

      if (userState.details.publisher.account_manager_id) {
        userState.details.owner = this.manageService.getUser(userState.details.publisher.account_manager_id)
          .then(response => {
            userState.details.owner = response['message'].results[0].username
          });
        fetchPromiseArr.push(userState.details.owner)
      } else {
        userState.details.owner = 'No Owner'
      }

      userState.paymentsMethods = this.manageService.getPaymentMethod(userState.details.publisher.id)
        .then(
          response => {
            userState.paymentsMethods = response['message'].results[0].payment_methods.results[0];
          });
      fetchPromiseArr.push(userState.paymentsMethods)
      userState.paymentsHistory = this.manageService.getPaymentHistory(userState.details.publisher.id)
        .then(
          response => {
            userState.paymentsHistory = response['message'].results;
          });
      fetchPromiseArr.push(userState.paymentsHistory);
      userState.ownershipHistory = this.manageService.getOwnershipHistory(userState.details.publisher.id)
        .then(
          response => {
            userState.ownershipHistory = this.manageService.removeDupicatesHistoryOwner(response['message'].results);
          });
      fetchPromiseArr.push(userState.ownershipHistory);

      if (this.utilsService.onSessionStorageLoad('publisherSites') === undefined) {

      }

      if (userState.sites.length > 0) {
        this.manageService.getSiteTags(userState.sites);
        fetchPromiseArr.push(userState.sites);
      } else {
        userState.sites = []
      }
      await Promise.all(fetchPromiseArr);
      this.isValidPublisher = true;
    }
    else {
      this.isValidPublisher = false;
    }
    this.utilsService.loader.next(false);
    return userState;
  }

}
