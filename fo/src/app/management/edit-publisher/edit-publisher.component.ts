import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

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
  verticals;
  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private route: ActivatedRoute,
              private router: Router,
              private renderer: Renderer2) { }

  async ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        const id = params['publisherId'];
        if (!this.utilsService.onSessionStorageCheckExistKey('publisherId')) {
          this.utilsService.onSessionStorageSave('publisherId', id);
        }
        if (id && id !== 'undefined') {
          this.userState = this.onGetuserStateDetails(id);
          this.getVerticals();
          this.isValidPublisher = true;
        } else {
          this.router.navigate(['../'], {relativeTo:this.route});
          this.isValidPublisher = false;
        }
      });
  }

  refreshAllPublisherData() {
    this.renderer.addClass(document.getElementById('refreshData'), 'refresh')
    const id = this.route.snapshot.params['publisherId']
    this.userState = this.onGetuserStateDetails(id);
  }

  getVerticals() {
    this.manageService.getVerticals()
      .then(
        response => {
          this.verticals = response['message'].results;
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
      sites: null
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

      if (this.utilsService.onSessionStorageLoad('publisherSites') !== undefined) {
        userState.sites = JSON.parse(this.utilsService.onSessionStorageLoad('publisherSites'));
        if (userState.sites.length > 0 && !userState.sites[0].hasOwnProperty('tags')) {
          this.manageService.getSiteTags(userState.sites);
        }
      } else {
        userState.sites = this.manageService.getSitesAndTags(userState.details.publisher.id)
          .then(
            response => {
              userState.sites = response['message'].results;
              this.utilsService.onSessionStorageSave('publisherSites', JSON.stringify(userState.sites));
            }
          )
      }

      fetchPromiseArr.push(userState.sites);
      await Promise.all(fetchPromiseArr);
      this.isValidPublisher = true;
    }
    else {
      this.isValidPublisher = false;
    }
    this.renderer.removeClass(document.getElementById('refreshData'), 'refresh')
    this.utilsService.loader.next(false);
    return userState;
  }
}
