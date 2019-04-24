import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserDetails} from "../../../shared/interfaces/user-details.interface";
import {ManagementService} from "../../management.service";

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit, OnDestroy {
  validData: boolean = false;
  fieldName: string = 'Email';
  publisherSubscription: Subscription;
  publisher: UserDetails = {
    details: [],
    last_login: [],
    owner: []
  };
  constructor(private manageService: ManagementService) {}
  ngOnInit() {
    this.publisherSubscription = this.manageService.presentPublihser
      .subscribe(
        (publisher: UserDetails) => {
          console.log(publisher);
          this.publisher = publisher;
          if (this.publisher.details.length > 0 && this.publisher.last_login.length > 0 && this.publisher.owner.length > 0) {
            this.validData = true;
          }
        }
      );
  }

  ngOnDestroy() {
    this.publisherSubscription.unsubscribe();
  }


}
