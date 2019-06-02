import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ManagementService} from "../../management.service";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../../../core/serviecs/utils.service";

interface ownershipHistory {
  id: number,
  placement_id: number,
  publisher_id: number,
  timestamp: string,
  user_id: number,
  owner_name: string
}

@Component({
  selector: 'app-publisher-ownership-history',
  templateUrl: './publisher-ownership-history.component.html',
  styleUrls: ['./publisher-ownership-history.component.css']
})
export class PublisherOwnershipHistoryComponent implements OnInit {
  ownerHistory: ownershipHistory[];
  displayedColumns: string[] = ['timestamp', 'hour', 'owner'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private manageService: ManagementService,
              private utilsService: UtilsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.utilsService.loader.next(true);
    this.manageService.getOwnershipHistory(this.route.snapshot.params['publisherId'])
      .then(res => {
        this.ownerHistory = res['message'].results
        this.utilsService.loader.next(false);
      })
      .catch(err => {
        console.log(err);
        this.utilsService.messageNotification(`Cannot get Data!`, null, 'failed')
        this.utilsService.loader.next(false);
      });
  }
}
