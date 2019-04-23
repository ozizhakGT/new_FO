import { Component, OnInit } from '@angular/core';
import {PaymentsMethodsEnum} from "../../../shared/enums/payments-methods.enum";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  paymentMetods;
  constructor() { }

  ngOnInit() {
      // this.paymentMetods = PaymentsMethodsEnum;
      // console.log(this.paymentMetods);

  }

}
