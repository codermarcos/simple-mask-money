<h1 align="center">SimpleMaskMoney</h1>

<h5 align="center">
  ⚠️<b>WARNING</b>⚠️<br>
  If you are having problems please check the version that you are using. <br>
  This package follows the <a href="https://semver.org/">semantic versioning</a> try to keep it updated with the <a href="https://github.com/codermarcos/simple-mask-money">latest version</a>.
</h5>

<p align="center">
  <a class="badge-align" href="https://github.com/codermarcos/simple-mask-money/actions/workflows/on_push.yaml">
    <img src="https://github.com/codermarcos/simple-mask-money/actions/workflows/on_push.yaml/badge.svg?event=push" alt="build status"/>
  </a>
  <a class="badge-align" href="https://badge.fury.io/js/simple-mask-money">
    <img src="https://badge.fury.io/js/simple-mask-money.svg" alt="npm version">
  </a>
  <a class="badge-align" href="https://www.npmjs.com/package/simple-mask-money">
    <img src="https://img.shields.io/npm/dm/simple-mask-money.svg" alt="npm downloads">
  </a>
  <a class="badge-align" href="https://www.apache.org/licenses/LICENSE-2.0">
    <img src="https://img.shields.io/badge/Apache-2.0-blue.svg" alt="License">
  </a>
</p>

Simple money mask developed with pure JavaScript 🗃️ **0 _dependecies_**, 🍃 Super light just **1.65kB gzipped**, 🔒 **100% Secure** (no [npm audit problems](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities) or [dependabot issues](https://github.com/codermarcos/simple-mask-money/security/dependabot)) which you can run on **Client Side** and **Server Side**. [Try **live demo**](https://simple-mask-money.codermarcos.zone/).

## 🎉 Getting Started

### Installation

First install it:

```shell
  npm i simple-mask-money --save
```

Or access the GitHub release directly:

```html
<script src="https://github.com/codermarcos/simple-mask-money/releases/download/<RELEASE_VERSION_HERE>/simple-mask-money.js"></script>
```

> Remember to replace **<RELEASE_VERSION_HERE>** with the [latest version](https://github.com/codermarcos/simple-mask-money/releases/latest)

### Implementation

After installed is just implement, for it choose the best example for you.

#### React JS Basic Example

For use with **React JS** you can pass only the **id**:

```tsx
import { useEffect } from 'react';
import { setMask } from 'simple-mask-money';

function InputMoneyComponent() {
  useEffect(setMask('#my-input'), []);

  return <input id="my-input" />
}
```

If you prefer you can use a [ref](https://react.dev/learn/referencing-values-with-refs):

```tsx
import { useEffect } from 'react';
import { setMask, useRef } from 'simple-mask-money';

function InputMoneyComponent() {
  const inputRef = useRef(null);

  useEffect(setMask(inputRef.current), []);

  return <input ref={inputRef} />
}
```

> These are only the basic usage if you need configure some arguments you can check [documentation about full api reference](./docs/4.x.x/)

#### Vanilla JS Basic Example

Here is a usage example with Vanilla JS:

```html
  <body>
    <!-- Set inputmode to numeric to show only numbers on mobile -->
    <input id="my-input" />

    <script src="./node_modules/simple-mask-money/lib/simple-mask-money.js"></script>
    
    <script>
      // Select the element
      const removeMask = SimpleMaskMoney.setMask('#my-input');
      // Convert the input value to a number, which you can save e.g. to a database:
      SimpleMaskMoney.formatToNumber(input.value);
    </script>
  </body>
```

> These are only the basic usage if you need configure some arguments you can check [documentation about full api reference](./docs/4.x.x/)

#### Vue JS Basic Example

Here is a usage example with Vue JS:

```html
<template>
  <form>
    <input type="text" id="my-input" />
  </form>
</template>

<script>
import { setMask, formatToNumber } from 'simple-mask-money'; // import mask

export default {
  mounted() {
    SimpleMaskMoney.setMask('#my-input'); // set mask on your input you can passing a querySelector
  },
  beforeUnmount() {
    SimpleMaskMoney.removeMask('#my-input'); // remove mask destroy listeners
  },
}
</script>
```

> These are only the basic usage if you need configure some arguments you can check [documentation about full api reference](./docs/4.x.x/)


#### Angular Basic Example

Here is a usage example with Angular JS:

```javascript
import { setMask, removeMask, formatToNumber } from 'simple-mask-money'; // import mask
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  template: '<input id="my-input" />'
})
export class InputMoneyComponent implements AfterViewInit, OnDestroy {

  ngAfterViewInit() {
    setMask('#my-input'); // set mask on your input you can pass a querySelector or your input element and options
  }

  ngOnDestroy() { 
    removeMask('#my-input'); // remove mask destroy listeners
  }
}
```

> These are only the basic usage if you need configure some arguments you can check [documentation about full api reference](./docs/4.x.x/)


## 📚 Detailed documentation

Read the [docs](docs/) or chose your implementation to check an example:

* [JavaScript](examples/4.x.x/javascript)
* [Angular](examples/4.x.x/angular)
* [React](examples/4.x.x/react)
* [Node](examples/4.x.x/node)
* [Vue](examples/4.x.x/vue)

## ✨ Some features and behaviours

* Clear the mask
  * Remove listeners
* Allow type only numbers
  * Block user to type non-numeric chars
* Allow negative numbers
  * It permit user add a negative sign
* Allow choose if negative sign is before or after
* Allow lock the carret bar on end
* Allow choose how many fractionalDigits
* Allow choose decimal and thousands separators
