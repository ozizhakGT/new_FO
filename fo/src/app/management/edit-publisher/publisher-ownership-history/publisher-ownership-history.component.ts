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
  ownerHistory: ownershipHistory[] = [];
  displayedColumns: string[] = ['timestamp', 'hour', 'owner'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private manageService: ManagementService) { }

  ngOnInit() {
    this.userState
      .then(
        userState => {
          console.log(userState);
          this.ownerHistory = userState.ownershipHistory;
        })
  }
}
