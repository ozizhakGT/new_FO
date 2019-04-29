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
  detailsForm: FormGroup;
  @Input() publisherDetails: Observable<any>;
  publisher;


  constructor(private manageService: ManagementService,
              private utilsService: UtilsService) {}

  ngOnInit() {
    this.formInit()
    this.publisherDetails
      .subscribe(
        value => {
          console.log(value)
        }
      )
  }



  formInit() {
      this.detailsForm = new FormGroup({
        'username': new FormControl('')
      })
  }

  submit() {
  }


}
