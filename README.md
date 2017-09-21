# SimpleMaskMoney
[![build Status](https://travis-ci.org/codermarcos/simple-mask-money.svg?branch=master)](https://travis-ci.org/codermarcos/simple-mask-money)
[![npm version](https://badge.fury.io/js/simple-mask-money.svg)](https://badge.fury.io/js/simple-mask-money)
[![npm Downloads](https://img.shields.io/npm/dm/simple-mask-money.svg)](https://www.npmjs.com/package/simple-mask-money)
[![dependencies Status](https://david-dm.org/codermarcos/simple-mask-money/status.svg)](https://david-dm.org/codermarcos/simple-mask-money)

[![NPM](https://nodei.co/npm/simple-mask-money.png?downloads=true&downloadRank=true)](https://nodei.co/npm/simple-mask-money/)

Simple money mask developed with pure JavaScript. [Try **live demo**](http://codermarcos.com/simple-mask-money/)

## Getting Started

First, install it.
```shell
  npm i simple-mask-money --save
```

* [Javascript](examples/javascript/#readme)
* [AngularX](examples/angularX#readme)
* [React](examples/react#readme)
* [Vue](examples/vue#readme)

Then, use it as follows:
```html
  <body>
    <!-- 
      inner html you put type text and inputmode numeric to mobile show numeric keyboard 
     -->
    <input inputmode="numeric" onkeyup="send(event)" value="0,00"
    oninput="this.value = SimpleMaskMoney.format(this.value)">

    <script src="./node_modules/simple-mask-money/lib/simple-mask-money.js"></script>
    <script>
      // select the element 
      let input = document.getElementsByTagName('input')[0];

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

      // Your send method 
      send = (e) => {
        if (e.key !== "Enter") return;
        // This method return value of your input in format number to save in your database
        SimpleMaskMoney.formatToNumber(input.value);
      }
    </script>
  </body>
```
