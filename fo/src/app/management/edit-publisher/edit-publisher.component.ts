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
      ownershipHistory: null
    };
    // get user request
    userState.details.publisher = await this.manageService.getUser(id);
    userState.details.publisher = userState.details.publisher['message'].results[0];

    if (userState.details.publisher) {
      userState.details.lastLogin = await this.manageService.getLastLogin(userState.details.publisher.username);
      userState.details.lastLogin = userState.details.lastLogin['message'].results[0];

      if (userState.details.publisher.account_manager_id) {
        userState.details.owner = await this.manageService.getUser(userState.details.publisher.account_manager_id);
        userState.details.owner = userState.details.owner['message'].results[0].username
      } else {
        userState.details.owner = 'No Owner'
      }

      userState.paymentsMethods = await this.manageService.getPaymentMethod(userState.details.publisher.id);
      userState.paymentsMethods = userState.paymentsMethods['message'].results[0].payment_methods.results[0];

      userState.paymentsHistory = await this.manageService.getPaymentHistory(userState.details.publisher.id);
      userState.paymentsHistory = userState.paymentsHistory['message'].results;

      userState.ownershipHistory = await this.manageService.getOwnershipHistory(userState.details.publisher.id);
      userState.ownershipHistory = this.manageService.removeDupicatesHistoryOwner(userState.ownershipHistory['message'].results);

      this.isValidPublisher = true;
    }
    else {
      this.isValidPublisher = false;
    }
    this.utilsService.loader.next(false);
    return userState;
  }

}
