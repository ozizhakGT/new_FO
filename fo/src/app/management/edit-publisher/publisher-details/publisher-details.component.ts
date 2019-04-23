import {Component, Input, OnInit} from '@angular/core';
import {ManagementService} from "../../management.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {
  fieldName: string = 'Email';
  @Input() publisher: any[] = [];
  lastSeenSubscription: Subscription;
  publisherLastSeen: any[] = [];
  constructor(private manageService: ManagementService) { }

  ngOnInit() {
    console.log(this.publisher)
    this.lastSeenSubscription = this.manageService.publisherlastSeen
      .subscribe(
        username => {
          this.publisherLastSeen = this.manageService.getPublisherLastLogin(username);
        }
      )

  }

}
