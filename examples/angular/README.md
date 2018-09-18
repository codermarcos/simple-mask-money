# SimpleMaskMoney Exemple AngularX

First, install it.

```shell
  npm i simple-mask-money --save
```

Then, use it as follows:

```javascript
import SimpleMaskMoney from 'simple-mask-money'; // import mask
import { Component, OnInit, AfterViewInit } from '@angular/core';

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
```

Or if you prefer use the methods in your events

```javascript
import { SimpleMaskMoney } from 'simple-mask-money'; // import mask
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <!-- 
    Put inputmode numeric to mobile show only numbers 
  -->
  <input #input inputmode="numeric" [(ngModel)]="val" (keyup)="send($event)" 
    (input)="input.value=SimpleMaskMoney.format(val)"/>
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
      prefix: '',
      suffix: '',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.'
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

### Get the exemple

To see an example of the code running, follow these steps:

1. Clone the repository

```shell
  git clone https://github.com/codermarcos/simple-mask-money.git
```

2. Enter on repository

```shell
  cd simple-mask-money/exemples/angular
```

3. Install dependencies

```shell
  npm i
```

4. start project

```shell
  npm start
```

5. open browser in [http://localhost:4200](http://localhost:4200)

```shell
  start "http://localhost:4200"
```
