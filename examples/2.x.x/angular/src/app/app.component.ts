import SimpleMaskMoney from 'simple-mask-money'; // import mask
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <!-- 
    Put inputmode numeric to mobile show only numbers 
  -->
  <input id="myInput" inputmode="numeric" [(ngModel)]="val" (keyup)="send($event)"/>
  `
})
export class AppComponent implements AfterViewInit {
  // Your value
  val = '0,00';

  constructor() {}

  ngAfterViewInit() {
    // Default configuration  
    const args = {
      allowNegative: false,
      negativeSignAfter: false,
      prefix: '',
      suffix: '',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.',
      cursor: 'move'
    };
    // set mask on your input you can pass a querySelector or your input element and options
    SimpleMaskMoney.setMask('#myInput', args);
  }

  // Your send method
  send(e) {
    if (e.key !== 'Enter') return;
    // This method return value of your input in format number to save in your database
    console.log(SimpleMaskMoney.formatToNumber(this.val));
  }
}
