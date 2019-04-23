import { Component, OnInit } from '@angular/core';
import {ManagementService} from "../../management.service";
import {ApiService} from "../../../shared/serviecs/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {

  constructor(private manageService: ManagementService,
              private apiService: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.onGetUserDetalis()
  }
  onGetUserDetalis() {
    const id = this.route.snapshot.params['publisherId'];
    if (id && id !== 'undefined') {
      console.log(id)
    }
  }

}
