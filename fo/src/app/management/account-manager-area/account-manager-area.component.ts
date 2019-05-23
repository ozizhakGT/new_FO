import { Component, OnInit } from '@angular/core';
import {ManagementService} from "../management.service";
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/map'
import {UtilsService} from "../../core/serviecs/utils.service";

@Component({
  selector: 'app-account-manager-area',
  templateUrl: './account-manager-area.component.html',
  styleUrls: ['./account-manager-area.component.css']
})
export class AccountManagerAreaComponent implements OnInit {
  admin: any[] =  [];
  publishers;
  displayedColumns: string[] = ['username', 'id', 'mode'];
  constructor(private utilsService: UtilsService, private manageService: ManagementService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(res => {
      this.admin = res['adminDetails'];
    })
    this.manageService.getAccountManagerPublishers(this.admin['id'])
      .then(
        response => {
          this.publishers = response['message'].results;
          this.utilsService.loader.next(false);
        }
      )
  }

}
