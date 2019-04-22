import {Component, OnDestroy, OnInit} from '@angular/core';
import {Publisher} from "../../shared/interfaces/publisher.interface";
import {ApiService} from "../../shared/serviecs/api.service";
import {UtilsService} from "../../shared/serviecs/utils.service";
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
  hasPublisher: boolean = false ;
  constructor(private utilsService: UtilsService,
              private managementService: ManagementService,
              private apiService: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
          if (params['publisherId'] && params['publisherId'] !== 'undefined') {
            this.apiService.getPaymentDetails(params['publisherId']);

            this.hasPublisher = true;
          } else {
            this.hasPublisher = false;
          }
      }
    )
  }

}
