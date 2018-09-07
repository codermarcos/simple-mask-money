<h1 align="center">SimpleMaskMoney</h1>
<p align="center">
  <a class="badge-align" href="https://travis-ci.org/codermarcos/simple-mask-money"><img  src="https://travis-ci.org/codermarcos/simple-mask-money.svg?branch=master" alt="build Status"/></a>

  <a class="badge-align" href="https://badge.fury.io/js/simple-mask-money">
  <img src="https://badge.fury.io/js/simple-mask-money.svg" alt="npm version"></a>
  
  <a class="badge-align" href="https://www.npmjs.com/package/simple-mask-money">
  <img src="https://img.shields.io/npm/dm/simple-mask-money.svg" alt="npm Downloads"></a>
  
  <a class="badge-align" href="https://www.codacy.com/app/codermarcos/simple-mask-money?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=codermarcos/simple-mask-money&amp;utm_campaign=Badge_Grade">
  <img src="https://api.codacy.com/project/badge/Grade/ee8f87689ae749b1822499995ef8d1d2" alt="Codacy Badge"></a>

  <a class="badge-align" href="https://opensource.org/licenses/Apache-2.0">
  <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
</p>

<p align="center">
  <a class="badge-align" href="https://nodei.co/npm/simple-mask-money/">
  <img src="https://nodei.co/npm/simple-mask-money.png?downloads=true&downloadRank=true" alt="NPM"></a>
</p>

<p align="center">
  Simple money mask developed with pure JavaScript. To run on <b>Client Side</b> and <b>Server Side</b>.
  <a href="http://simple-mask-money.codermarcos.com/">Try <b>live demo</b></a> 
</p>

## Getting Started

First, install it.

```shell
  npm i simple-mask-money --save
```

Or use direct of github release

```html
<script src="https://github.com/codermarcos/simple-mask-money/releases/download/RELEASE_VERSION_HERE/simple-mask-money.js"></script>
```

> remember change RELEASE_VERSION_HERE by the [last version](https://github.com/codermarcos/simple-mask-money/releases/latest)

Read the [docs](docs/#readme) or chose your implementation:

* [Javascript](examples/javascript/#readme)
* [Angular](examples/angular#readme)
* [React](examples/react#readme)
* [Node](examples/node#readme)
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
        allowNegative: false,
        negativeSignAfter: false,
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
        allowNegative: false,
        negativeSignAfter: false,
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
