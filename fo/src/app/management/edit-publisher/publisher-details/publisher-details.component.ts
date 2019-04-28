import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {
  @Input() publisherDetails;


  constructor() {}

  ngOnInit() {
  }



}
