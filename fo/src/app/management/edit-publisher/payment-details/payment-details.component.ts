import {Component, Input, OnInit} from '@angular/core';
import {ManagementService} from "../../management.service";
import {paymentsMethodsArray} from "../../enums/publisher-enums";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  @Input() userState: Promise<any>;
  paymetsMethodOption = paymentsMethodsArray;
  paymentmethodsForm: FormGroup;
  constructor(private manageService: ManagementService) { }

  ngOnInit() {
      this.userState.then(
        paymentMethods => {
          console.log(paymentMethods)
          this.paymentMethodsOnInitForm(paymentMethods.paymentsMethods)
        }
      )
  }

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
    })
    console.log(this.paymentmethodsForm)
  }

}
