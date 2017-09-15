import { SimpleMaskMoney } from 'simple-mask-money'; // import mask
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <!-- 
    inner html you put type text and inputmode numeric to mobile show numeric keyboard 
  -->
  <input [(ngModel)]="val" (input)="val=SimpleMaskMoney.format(val)" (keyup)="send()"/>
  `
})
export class AppComponent implements OnInit {

  // declare mask in your class to use in html templete
  SimpleMaskMoney = SimpleMaskMoney; // if you prefer use only in class this line is not necessary

  // Your value
  val = '0,00';

  constructor() { }

  ngOnInit() {
    // configuration       
    SimpleMaskMoney.args = {
      preffix: '',
      suffix: '',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.'
    };
  }

  // Your send method 
  send() {

    // This method return value of your input in format number to save in your database
    SimpleMaskMoney.formatToNumber(this.val);
  }
}
