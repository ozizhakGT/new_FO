import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ManagementService} from "../../management.service";
import {MatPaginator, MatTableDataSource} from '@angular/material';

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
  @Input() userState: Promise<any>;
  // ownerHistory: ownershipHistory[] = [];
  // shortOwnerHistory: ownershipHistory[] = [];
  noResluts: boolean = false;
  displayedColumns: string[] = ['timestamp', 'hour', 'owner'];
  ELEMENT_DATA: ownershipHistory[] = [];
  ownerHistory = new MatTableDataSource<ownershipHistory>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private manageService: ManagementService) { }

  ngOnInit() {
    this.userState
      .then(
        userState => {
          this.ELEMENT_DATA = this.removeDupicates(userState.ownershipHistory);
        })
    // console.log(this.shortOwnerHistory)
  }

  removeDupicates(ownershipHistory) {
    let holder = {};
    let history = [];
    ownershipHistory.forEach(
      log => {
        if (log['user_id'] !== holder['user_id'] && log['timestamp'] !== holder['timestamp']) {
          this.manageService.getUser(log['user_id']).then(owner => log['owner_name'] = owner['message'].results[0].username);
          history.push(log)
        }
        holder = log;
      });
    return history
  }
}
