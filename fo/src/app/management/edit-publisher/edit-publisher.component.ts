import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../core/serviecs/utils.service";
import {ManagementService} from "../management.service";
import {ActivatedRoute, Params} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {PublisherApiService} from "../../core/serviecs/publisher-api.service";

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css']
})
export class EditPublisherComponent implements OnInit {
  isValidPublisher: boolean = false;
  publisher: Observable<any>;

  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe()
      .subscribe(
      (params: Params) => {
        this.utilsService.loader.next(true);
        const id = params['publisherId'];
        if (id && id !== 'undefined') {
          this.publisher = this.manageService.getUser(id)
          this.isValidPublisher = true;
        } else {
          this.isValidPublisher = false;
        }
        this.utilsService.loader.next(false);
        // this.manageService.hasPublisher.next(this.isValidPublisher)
      });
  }

}
