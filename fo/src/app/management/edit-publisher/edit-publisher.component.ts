import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../core/serviecs/utils.service";
import {ManagementService} from "../management.service";
import {ActivatedRoute, Params} from "@angular/router";
import {UserDetails} from "../../shared/interfaces/user/user-details.interface";

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css']
})
export class EditPublisherComponent implements OnInit {
  isValidPublisher: boolean;
  userState: Promise<any>;
  generalDetails;

  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe()
      .subscribe(
      (params: Params) => {
        const id = params['publisherId'];
        if (id && id !== 'undefined') {
          this.isValidPublisher = true;
          this.userState = this.onGetUserDetails(id)
          this.userState.then(
            value => {
              this.generalDetails = {
                ...value.details.lastLogin,
                owner: value.details.owner
              };
              console.log(this.generalDetails)
            }
          )
            .catch(err => {
                this.utilsService.loader.next(false);
            })
        } else {
          this.isValidPublisher = false;
        }
      });
  }

  async onGetUserDetails(id) {
    this.utilsService.loader.next(true);
    let user: UserDetails = {
      details: {
        publisher: null,
        lastLogin: null,
        owner: null
      }
    };
    user.details.publisher = await this.manageService.getUser(id);
    user.details.publisher = user.details.publisher['message'].results[0];
    if (user.details.publisher) {
      user.details.lastLogin = await this.manageService.getLastLogin(user.details.publisher.username);
      user.details.lastLogin = user.details.lastLogin['message'].results[0];

      if (user.details.publisher.account_manager_id) {
        user.details.owner = await this.manageService.getUser(user.details.publisher.account_manager_id);
        user.details.owner = user.details.owner['message'].results[0].username
      } else {
        user.details.owner = 'No Owner'
      }
      this.isValidPublisher = true;
    }
    else {
      this.isValidPublisher = false;
    }


    this.utilsService.loader.next(false);
    return user;
  }

}
