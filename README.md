# SimpleMaskMoney

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/85a1c72bdbab46e7b9eca22acbcce031)](https://app.codacy.com/app/codermarcos/simple-mask-money?utm_source=github.com&utm_medium=referral&utm_content=codermarcos/simple-mask-money&utm_campaign=Badge_Grade_Settings)
[![build Status](https://travis-ci.org/codermarcos/simple-mask-money.svg?branch=master)](https://travis-ci.org/codermarcos/simple-mask-money)
[![npm version](https://badge.fury.io/js/simple-mask-money.svg)](https://badge.fury.io/js/simple-mask-money)
[![npm Downloads](https://img.shields.io/npm/dm/simple-mask-money.svg)](https://www.npmjs.com/package/simple-mask-money)
[![bitHound Dependencies](https://www.bithound.io/github/codermarcos/simple-mask-money/badges/dependencies.svg)](https://www.bithound.io/github/codermarcos/simple-mask-money/master/dependencies/npm)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[![NPM](https://nodei.co/npm/simple-mask-money.png?downloads=true&downloadRank=true)](https://nodei.co/npm/simple-mask-money/)

Simple money mask developed with pure JavaScript. To run on **Client Side** and **Server Side**. [Try **live demo**](https://codermarcos.github.io/simple-mask-money/)

## Getting Started

First, install it.

```shell
  npm i simple-mask-money --save
```

* [Javascript](examples/javascript/#readme)
* [Angular](examples/angular#readme)
* [React](examples/react#readme)
* [Vue](examples/vue#readme)

Then, follow the example to use in your browser:

```html
  <body>
    <!-- 
      Put inputmode numeric to mobile show only numbers 
    -->
    <input id="myInput" inputmode="numeric" value="0,00">

    <script src="./node_modules/simple-mask-money/lib/simple-mask-money.js"></script>
    <script>

      // configuration
      const args = {
        prefix: '',
        suffix: '',
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ',',
        thousandsSeparator: '.'
      };

      // select the element
      const input = SimpleMaskMoney.setMask('#myInput', args);

      // This method return value of your input in format number to save in your database
      input.formatToNumber();

    </script>
  </body>
```

Or if you prefer use the methods in your events

```html
  <body>
    <!-- 
      Put inputmode numeric to mobile show only numbers 
    -->
    <input inputmode="numeric" value="0,00">

    <script src="./node_modules/simple-mask-money/lib/simple-mask-money.js"></script>
    <script>
      // select the element
      let input = document.getElementsByTagName('input')[0];

      // configuration
      SimpleMaskMoney.args = {
        prefix: '',
        suffix: '',
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ',',
        thousandsSeparator: '.'
      };

      input.oninput = () => {
        input.value = SimpleMaskMoney.format(input.value);
      }

      // Your send method
      input.onkeyup = (e) => {
        if (e.key !== "Enter") return;
        // This method return value of your input in format number to save in your database
        SimpleMaskMoney.formatToNumber(input.value);
      }
    </script>
  </body>
```
