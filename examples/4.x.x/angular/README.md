# SimpleMaskMoney Example AngularX

## Getting started

First, install it.

```shell
  npm i simple-mask-money --save
```

Then, use it as follows:

```javascript
import { setMask, removeMask, formatToNumber } from 'simple-mask-money'; // import mask
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  template: '<input id="my-input" [(ngModel)]="val" (keyup)="send($event)"/>'
})
export class InputMoneyComponent implements AfterViewInit, OnDestroy {
  // Your value
  val = '0,00';

  constructor() {}

  ngAfterViewInit() {
    // Default configuration  
    const configuration = {
      afterFormat(e) { console.log('afterFormat', e); },
      allowNegative: false,
      beforeFormat(e) { console.log('beforeFormat', e); },
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
    setMask('#my-input', configuration);
  }

  ngOnDestroy() { 
    removeMask('#my-input'); // remove mask destroy listeners
  }

  // Your send method
  send(e) {
    if (e.key !== 'Enter') return;
    // This method return value of your input in format number to save in your database
    console.log(formatToNumber(this.val));
  }
}
```
