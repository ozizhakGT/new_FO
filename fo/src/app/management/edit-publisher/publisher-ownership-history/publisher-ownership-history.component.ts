import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ManagementService} from "../../management.service";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../../../core/serviecs/utils.service";

@Component({
  selector: 'app-publisher-ownership-history',
  templateUrl: './publisher-ownership-history.component.html',
  styleUrls: ['./publisher-ownership-history.component.css']
})
export class PublisherOwnershipHistoryComponent implements OnInit {
  ownerHistory: any[];
  displayedColumns: string[] = ['timestamp', 'hour', 'owner'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private manageService: ManagementService,
              private utilsService: UtilsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.utilsService.loader.next(true);
    this.manageService.getOwnershipHistory(this.route.snapshot.params['publisherId'])
      .then(res => {
        let holderArr = [];
        if (res['message'].results.length > 0) {
          let holder = 0;
          res['message'].results.forEach((line,i) => {
            if (i === 0) {
              return holderArr.push(line);
            }
            if (res['message'].results[holder]['username'] !== line['username']) {
              holder = i;
              return holderArr.push(line);
            }
          });
          this.ownerHistory = holderArr;
        } else {
          this.ownerHistory = [];
        }
        this.utilsService.loader.next(false)
      })
      .catch(err => {
        console.log(err);
        this.utilsService.messageNotification(`Cannot get Data!`, null, 'failed');
        this.utilsService.loader.next(false);
      });
  }
}
