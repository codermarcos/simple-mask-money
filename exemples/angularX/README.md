# SimpleMaskMoney Exemple AngularX
First, install it.
```shell
  npm i simple-mask-money --save
```
Then, use it as follows:
```javascript
    import { SimpleMaskMoney } from 'simple-mask-money';
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      template: `<input type="text" inputmode="numeric" (ngModelChange)="model=SimpleMaskMoney.format($event)" [ngModel]="model" />`
    })
    export class AppComponent {
      
      SimpleMaskMoney: SimpleMaskMoney;

      model = '';

      constructor() { 
        this.SimpleMaskMoney = SimpleMaskMoney;
      }
    }

```
