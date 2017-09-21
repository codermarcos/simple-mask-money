# SimpleMaskMoney Exemple AngularX
First, install it.
```shell
  npm i simple-mask-money --save
```
Then, use it as follows:
```javascript
import { SimpleMaskMoney } from 'simple-mask-money'; // import mask
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <!-- 
    Put inputmode numeric to mobile show only numbers 
  -->
  <input #input inputmode="numeric" [(ngModel)]="val" (keyup)="send($event)" (input)="input.value=SimpleMaskMoney.format(val)"/>
  `
})
export class AppComponent implements OnInit {
  // declare mask in your class to use in html templete
  SimpleMaskMoney = SimpleMaskMoney; // if you prefer use only in class this line is not necessary

  // Your value
  val = '0,00';

  constructor() {}

  ngOnInit() {
    // configuration
    SimpleMaskMoney.args = {
      preffix: '',
      suffix: '',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.',
      autoCompleteDecimal: false
    };
  }

  // Your send method
  send(e) {
    if (e.key !== 'Enter') return;
    // This method return value of your input in format number to save in your database
    SimpleMaskMoney.formatToNumber(this.val);
  }
}
```
