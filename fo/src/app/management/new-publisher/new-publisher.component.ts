import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../../core/serviecs/utils.service";
import {paymentsPeriodStructure, userStatusStructure, userTypeStructure} from "../enums/publisher-enums";
import {ManagementService} from "../management.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
  styleUrls: ['./new-publisher.component.css']
})
export class NewPublisherComponent implements OnInit {
  userTypes = userTypeStructure;
  userStatus = userStatusStructure;
  periodTypes = paymentsPeriodStructure;
  isSpinner: boolean = false;
  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.utilsService.loader.next(false)
  }
  onCreateUser(form) {
    this.isSpinner = true;
    let sendVerification = this.prapareObj(form);
    let period = {payment_period: form.value['payment_period'], payment_method: null};
    delete form.value['payment_period'];
    const user = {...form.value};
    console.log(user, sendVerification);
    this.manageService.createUser(sendVerification, user).then(async resolve => {
          if (resolve['type'] === 'created') {
            const id = resolve['message'][0];
            sessionStorage.setItem('publisherId', id);
            period['user_id'] = id;
            this.manageService.postTakeOwner(id).catch(err => console.log(err));
            await this.manageService.createPaymentMethod(id, period).then(response => {
              //TODO : ERROR AND SUCCESS HANDLER (NAVIGATE TO USER DETAILS!)
              if (resolve['type'] === 'created') {
                this.utilsService.messageNotification(`Publisher Created Successfilly!`, null, 'success');
                this.router.navigate(['publisher/edit', id]);
              }
            })
            .catch(err => {
              this.isSpinner = false;
              this.utilsService.messageNotification(`Error Creating Payment Method for Publisher !`, null, 'failed')
            })
          }
      })
      .catch(err => {
        console.log(err)
        this.utilsService.messageNotification(`Error Creating Publisher !`, null, 'failed');
      })
  }

  prapareObj(f) {
    let form = f.value;
    form['source_id'] = 'FO';
    const properties = ['account_type', 'mode'];
    for (let property of properties) {
      if (property === 'account_type') {
        form['group_id'] = form[property] === 0 ? -1 : 300;
        continue;
      }
      if (property === 'mode') {
        return form[property] === 0;
      }
    }
  }

}
