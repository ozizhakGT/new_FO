import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../../core/serviecs/utils.service";
import {paymentsPeriodStructure, userStatusStructure, userTypeStructure} from "../enums/publisher-enums";
import {ManagementService} from "../management.service";
@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
  styleUrls: ['./new-publisher.component.css']
})
export class NewPublisherComponent implements OnInit {
  userTypes = userTypeStructure;
  userStatus = userStatusStructure;
  periodTypes = paymentsPeriodStructure;
  user = {group_id: null, source_id: 'FO'};
  constructor(private utilsService: UtilsService,
              private manageService: ManagementService) { }

  ngOnInit() {
    this.utilsService.loader.next(false)
  }

  onCreateUser(form) {
    this.user['group_id'] = form.value['account_type'] === 0 ? -1 : 300;
    const sendVerification = form.value.mode === 0;
    let period = {payment_period: form.value['payment_period'], payment_method: null};
    delete form.value['payment_period'];
    const user = {...this.user, ...form.value};

    this.manageService.createUser(sendVerification, user).then(resolve => {
          if (resolve['type'] === 'created') {
            const id = resolve['message'][0];
            period['user_id'] = id;
            console.log(period)
            this.manageService.createPaymentMethod(id, period).then(response => {
              console.log(response)
            })
          }
      })
  }

}
