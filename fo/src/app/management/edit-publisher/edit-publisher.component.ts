import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../../core/serviecs/utils.service";
import {ManagementService} from "../management.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css']
})
export class EditPublisherComponent implements OnInit {
  publisher: any[] = [];
  hasPublisher: boolean = false ;
  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['publisherId'];
        if (id && id !== 'undefined') {
          this.hasPublisher = true;
          this.manageService.onGetPublisherDetails(id)
        } else {
          this.hasPublisher = false;
        }
      }
    );
  }
}
