import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../core/serviecs/utils.service";
import {ManagementService} from "../management.service";
import {ActivatedRoute, Params} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {PublisherApiService} from "../../core/serviecs/publisher-api.service";

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css']
})
export class EditPublisherComponent implements OnInit {
  publisherDetails: any[] =[];
  isValidPublisher: boolean = false ;
  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['publisherId'];
        if (id && id !== 'undefined') {
          this.onGetUser(id);
          this.isValidPublisher = true;
        } else {
          this.isValidPublisher = false;
        }
        this.manageService.hasPublisher.next(this.isValidPublisher)
      });
  }
  onGetUser(id) {
    this.manageService.getUser(id).toPromise()
      .then(
        user => {
          this.publisherDetails = user['message'].results[0];
          console.log(this.publisherDetails);
        }
      )
  }
}
