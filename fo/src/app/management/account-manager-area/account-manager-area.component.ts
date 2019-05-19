import { Component, OnInit } from '@angular/core';
import {ManagementService} from "../management.service";

@Component({
  selector: 'app-account-manager-area',
  templateUrl: './account-manager-area.component.html',
  styleUrls: ['./account-manager-area.component.css']
})
export class AccountManagerAreaComponent implements OnInit {
  adminData = JSON.parse(localStorage.getItem('adminData'));
  publishers;
  displayedColumns: string[] = ['username', 'id', 'mode'];
  constructor(private manageService: ManagementService) { }

  ngOnInit() {
    console.log(this.adminData)
    this.manageService.getAccountManagerPublishers(this.adminData.id)
      .then(
        response => {
          this.publishers = response['message'].results;
          console.log(this.publishers)
        }
      )
  }

}
