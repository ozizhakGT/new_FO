import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ManagementService} from "../../management.service";
import {Observable} from 'rxjs/Observable';
import {UtilsService} from "../../../core/serviecs/utils.service";

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {
  @Input() userDetails: Promise<any>;
  detailsForm: FormGroup;
  // owner;
  // lastLogin;
  // userDetails;


  constructor() {}

  ngOnInit() {
    this.userDetails.then(
      value => {
        this.formInit(value.details.publisher)
      })
    // this.formInit(this.userDetails);
  }

  formInit(publisher) {
      this.detailsForm = new FormGroup({
        'first_name': new FormControl(publisher.first_name),
        'last_name': new FormControl(publisher.last_name),
      })
  }

  submit() {
  }


}
