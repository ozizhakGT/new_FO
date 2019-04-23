import {Component, OnDestroy, OnInit} from '@angular/core';
import {PublisherApiService} from "../../core/serviecs/publisher-api.service";
import {UtilsService} from "../../core/serviecs/utils.service";
import {ManagementService} from "../management.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css']
})
export class EditPublisherComponent implements OnInit, OnDestroy {
  publisherSubscription: Subscription;
  publisher: any[] = [];
  hasPublisher: boolean = false ;
  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private apiService: PublisherApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['publisherId'];
        if (id && id !== 'undefined') {
          this.hasPublisher = true;
          this.manageService.ongetPublisherDetails(id);
        } else {
          this.hasPublisher = false;
        }
      }
    );
    this.publisherSubscription = this.manageService.presentPublihser
      .subscribe(
        (publisher: any[]) => {
          console.log(publisher)
          this.publisher = publisher;
          this.manageService.publisherlastSeen.next(this.publisher[0].username);
        }
      );
  }

  ngOnDestroy() {
    this.publisherSubscription.unsubscribe();
  }

}
