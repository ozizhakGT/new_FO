import {Component, OnInit} from '@angular/core';
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
export class EditPublisherComponent implements OnInit {
  publisherSubscription: Subscription;
  hasPublisher: boolean = true ;
  constructor(private utilsService: UtilsService,
              private managementService: ManagementService,
              private apiService: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
