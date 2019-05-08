import {Component, Input, OnInit} from '@angular/core';
import {ManagementService} from "../../management.service";
import {paymentMethodArray, paymentsMethodsStructure, paymentsPeriodStructure} from "../../enums/publisher-enums";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilsService} from "../../../core/serviecs/utils.service";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  @Input() userState: Promise<any>;

  paymentmethodsForm: FormGroup;

  paymentsMethodOption = paymentsMethodsStructure;
  paymentsMethodArray = paymentMethodArray;
  paymentPeriodOption = paymentsPeriodStructure;


  genearalDetails =  {user_id: null, payment_method_id: null};
  paymentsHistory: any[] = [];

  spinner: boolean = false;
  constructor(private manageService: ManagementService,
              private utilsService: UtilsService) { };

  ngOnInit() {
      this.userState.then(
        paymentMethods => {
          // console.log(this.paymentsHistory)
          this.genearalDetails = {
            user_id: paymentMethods.paymentsMethods.user_id,
            payment_method_id: paymentMethods.paymentsMethods.id
          };
          this.paymentMethodsOnInitForm(paymentMethods.paymentsMethods);
          this.paymentsHistory = paymentMethods.paymentsHistory;
        });
  };

  paymentMethodsOnInitForm(form) {
    this.paymentmethodsForm = new FormGroup({
      'payment_method': new FormControl(form.payment_method),
      'payment_email': new FormControl(form.payment_email),
      'beneficiary_name': new FormControl(form.beneficiary_name),
      'beneficiary_address': new FormControl(form.beneficiary_address),
      'bank_name': new FormControl(form.bank_name),
      'bank_address': new FormControl(form.bank_address),
      'swift_code': new FormControl(form.swift_code),
      'iban_number': new FormControl(form.iban_number),
      'account_number': new FormControl(form.account_number),
      'payment_period': new FormControl(form.payment_period),
      'comment': new FormControl(form.comment),
    });
  };

  onUpdatePaymentMethod(form) {
    this.spinner = true;
    this.manageService.updatePaymentMethod(this.genearalDetails.user_id, this.genearalDetails.payment_method_id, form.value)
      .then(
        response => {
          if (response['type'] === 'updated') {
            this.utilsService.messageNotification('Payment Method Update!', null, 'success')
          }
        })
      .catch(err => this.utilsService.messageNotification('Failed Update Payment Method!', null, 'failed'))
      .finally(() => this.spinner = false)
  }

}
