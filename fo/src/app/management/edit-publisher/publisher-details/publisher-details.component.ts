import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ManagementService} from "../../management.service";
import {PublisherApiService} from "../../../core/serviecs/publisher-api.service";
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../../../core/serviecs/utils.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit, OnDestroy {
  fieldName: string = 'Email';
  publisherSubscription: Subscription;
  publisher = {};
  owner: string = '';
  lastlogin = {};
  dataIsPrapre: boolean = false;

  constructor(private manageService: ManagementService,
              private publisherService: PublisherApiService,
              private utilsService: UtilsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.publisherSubscription = this.manageService.hasPublisher
      .subscribe(
        value => {
          if (value) {
            let id = this.route.snapshot.params['publisherId'];
            this.getUserDetails(id);
          }
        }
  );
  }
  ngOnDestroy() {
    this.publisherSubscription.unsubscribe();
    this.utilsService.loader.next(false);
  }

  getUserDetails(publisherId) {
    this.utilsService.loader.next(true);
    this.dataIsPrapre = false;
    this.publisherService.getPublisherDetails(publisherId)
      .then(
        value => {
          this.publisher = value['message'].results[0];
          this.publisherService.getPublisherLastLogin(this.publisher['username'])
            .then(
              lastLogin => {
                this.lastlogin = lastLogin['message'].results[0]
              }
            )
          this.publisherService.getOwnerById(this.publisher['account_manager_id'])
            .then(owners => {
              if (owners.length === 1) {
                this.owner = owners[0].username;
              } else {
                let ownerId = owners.findIndex(owner => owner._id == this.publisher['account_manager_id'])
                this.owner = owners[ownerId].username
              }
              this.utilsService.loader.next(false);
              this.dataIsPrapre = true;
            });
        }
      );
  }

  userDetalisForm(f: NgForm) {
    console.log(f)
  }


}
