# SimpleMaskMoney
[![Build Status](https://travis-ci.org/codermarcos/simple-mask-money.svg?branch=master)](https://travis-ci.org/codermarcos/simple-mask-money)
[![Version npm](https://img.shields.io/npm/v/simple-mask-money.svg)](https://www.npmjs.com/package/simple-mask-money) 
[![npm Downloads](https://img.shields.io/npm/dm/simple-mask-money.svg)](https://www.npmjs.com/package/simple-mask-money)
[![dependencies Status](https://david-dm.org/codermarcos/simple-mask-money/status.svg)](https://david-dm.org/codermarcos/simple-mask-money)

[![NPM](https://nodei.co/npm/simple-mask-money.png?downloads=true&downloadRank=true)](https://nodei.co/npm/simple-mask-money/)

Simple money mask developed with pure JavaScript. [Try **live demo**](http://codermarcos.com/simple-mask-money/)

## Getting Started

First, install it.
```shell
  npm i simple-mask-money --save
```

* [Javascript](exemples/javascript/#readme)
* [AngularX](exemples/angularX#readme)
* [React](exemples/react#readme)
* [Vue](exemples/vue#readme)

Then, use it as follows:
```html
  <body>
    <!-- 
      inner html you put type text and inputmode numeric to mobile show only numbers 
     -->
    <input inputmode="numeric" oninput="this.value = SimpleMaskMoney.format(this.value)" onkeyup="send()" value="0,00"><br>

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
        thousandsSeparator: '.'
      };

      // Your send method 
      send = () => {

        // This method return value of your input in format number to save in your database
        SimpleMaskMoney.formatToNumber(input.value);
      }
    </script>
  </body>
```