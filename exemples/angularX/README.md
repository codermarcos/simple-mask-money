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
        inner html you put type text and inputmode numeric to mobile show numeric keyboard 
      -->
      <input [(ngModel)]="val" (input)="val=SimpleMaskMoney.format(val)" />
      `
    })
    export class AppComponent OnInit {

      // declare mask in your local
      SimpleMaskMoney: SimpleMaskMoney = SimpleMaskMoney;

      // Your value
      val: string = '0,00';

      constructor() {}

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
    }

```
