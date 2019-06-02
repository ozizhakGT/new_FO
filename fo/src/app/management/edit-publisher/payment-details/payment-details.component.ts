import {Component, Input, OnInit} from '@angular/core';
import {ManagementService} from "../../management.service";
import {paymentMethodArray, paymentsMethodsStructure, paymentsPeriodStructure} from "../../enums/publisher-enums";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilsService} from "../../../core/serviecs/utils.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  paymentmethodsForm: FormGroup;

  paymentsMethodOption = paymentsMethodsStructure;
  paymentsMethodArray = paymentMethodArray;
  paymentPeriodOption = paymentsPeriodStructure;
  paymentsHistory: any[] = [];
  page: number = 1;
  isVirtualCoinsAllowed: number;
  spinner: boolean = false;
  constructor(private manageService: ManagementService,
              private utilsService: UtilsService,
              private route: ActivatedRoute) { };

  ngOnInit() {
    //TODO: need sending bitcoin_allowed to update array in payment methods! ! ! !
    console.log(this.route.snapshot.params['publisherId'])
    this.getPaymentDetails(this.route.snapshot.params['publisherId']);
  }

  async getPaymentDetails(publisherId) {
    this.utilsService.loader.next(true);
    let promiseArr = [this.manageService.getPaymentMethod(publisherId), this.manageService.getPaymentHistory(publisherId)];
    await Promise.all(promiseArr)
      .then(res => {
        this.isVirtualCoinsAllowed = res[0]['message'].results[0]['bitcoin_allowed'] === 1 ? this.paymentsMethodOption.length : 3;
        const paymentMethods = res[0]['message'].results[0].payment_methods.results;
        if (paymentMethods.length > 0) {
          this.paymentMethodsOnInitForm(paymentMethods[0]);
          this.paymentsHistory = res[1]['message'].results;
        }
        this.utilsService.loader.next(false);
      })
      .catch(err => {
        console.log(err)
        this.utilsService.messageNotification(`Cannot get Data!`, null, 'failed')
        this.utilsService.loader.next(false);
      });
  }

  paymentMethodsOnInitForm(paymentDetails) {
    this.paymentmethodsForm = new FormGroup({
      'payment_id': new FormControl(paymentDetails.id),
      'user_id': new FormControl(paymentDetails.user_id),
      'payment_method': new FormControl(paymentDetails.payment_method || ''),
      'payment_email': new FormControl(paymentDetails.payment_email || ''),
      'beneficiary_name': new FormControl(paymentDetails.beneficiary_name || ''),
      'beneficiary_address': new FormControl(paymentDetails.beneficiary_address || ''),
      'bank_name': new FormControl(paymentDetails.bank_name || ''),
      'bank_address': new FormControl(paymentDetails.bank_address || ''),
      'swift_code': new FormControl(paymentDetails.swift_code || ''),
      'iban_number': new FormControl(paymentDetails.iban_number || ''),
      'account_number': new FormControl(paymentDetails.account_number || ''),
      'payment_period': new FormControl(paymentDetails.payment_period || ''),
      'comment': new FormControl(paymentDetails.comment || ''),
    });
  };

  onUpdatePaymentMethod(form) {
    this.spinner = true;
    this.manageService.updatePaymentMethod(form.value.user_id, form.value.payment_id, form.value)
      .then(
        async response => {
          if (response['type'] === 'updated') {
            this.utilsService.messageNotification('Payment Method Update!', null, 'success');
            await this.onGetPaymentsHistory(form.value.user_id)
            this.spinner = false;
          }
        })
      .catch(err => {
        console.log(err);
        this.utilsService.messageNotification('Failed Update Payment Method!', null, 'failed')
        this.spinner = false;
      })
  }
  onGetPaymentsHistory(publisherId) {
    this.manageService.getPaymentHistory(publisherId)
      .then(
        response => {
          this.paymentsHistory = response['message'].results;
        }
      )
  }
}
