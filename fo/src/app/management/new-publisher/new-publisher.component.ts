import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../../core/serviecs/utils.service";
import {paymentsPeriodStructure, userStatusStructure, userTypeStructure} from "../enums/publisher-enums";
@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
  styleUrls: ['./new-publisher.component.css']
})
export class NewPublisherComponent implements OnInit {
  userTypes = userTypeStructure;
  userStatus = userStatusStructure;
  periodTypes = paymentsPeriodStructure;
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.utilsService.loader.next(false)
  }

}
