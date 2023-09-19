# 📚 Documentation SimpleMaskMoney 4.x.x

## Table of Contents

* [About the package](#about-the-package)
* [Configuration](#simplemaskmoneyconfiguration)
  * [Example](#example-simplemaskmoneyconfiguration)
* [setMask](#simplemaskmoneysetmask)
  * [Vanilla JS Example](#example-simplemaskmoneysetmask-using-with-vanilla-js)
  * [React Example](#example-simplemaskmoneysetmask-using-with-react-js)
* [removeMask](#simplemaskmoneyremovemask)
  * [Vanilla JS Example](#example-simplemaskmoneyremovemask-using-with-vanilla-js)
  * [React Example](#example-simplemaskmoneyremovemask-using-with-react-js)
* [formatToCurrency](#simplemaskmoneyformattocurrency)
  * [CJS Example](#example-simplemaskmoneyformattocurrency-cjs)
  * [ESM Example](#example-simplemaskmoneyformattocurrency-esm)
  * [Browser Example](#example-simplemaskmoneyformattocurrency-browser)
* [formatToNumber](#simplemaskmoneyformattonumber)
  * [CJS Example](#example-simplemaskmoneyformattonumber-cjs)
  * [ESM Example](#example-simplemaskmoneyformattonumber-esm)
  * [Browser Example](#example-simplemaskmoneyformattonumber-browser)
* [createInstanceOf](#simplemaskmoneycreateinstanceof)
  * [CJS Example](#example-simplemaskmoneycreateinstanceof-cjs)
  * [ESM Example](#example-simplemaskmoneycreateinstanceof-esm)
  * [Browser Example](#example-simplemaskmoneyformattonumber-browser)

## About the package

The ```SimpleMaskMoney``` package hosts:

* **4** four methods for formatting the values.
* **1** one method to define a default configuration to all executions.

## SimpleMaskMoneyConfiguration

Here is the full configutation which this package allow. All these following configurations are optional:

| Name | Type | Default value | Description | Reference to internal code |
| ---- | ---- | ------------- | ----------- | -------------------------- |
| **afterFormat** | `(value: string) => void` | None | is used for get the value when the mask is already applied | |
| **allowNegative** | `boolean` | `false` | is used for define if allow values less than zero | |
| **beforeFormat** | `(value: string) => string` | None | is used for get the value when the mask will be applied | |
| **cursor** | `"move"` &#124; `"end"` | `"end"` | is used for define a string that always follows its value | |
| **decimalSeparator** | `string` | `","` | is used for define the separator of decimals digits | |
| **fixed** | `boolean` | `true` | is used for define if your value can be empty (e.g. `$_,__`) or always should have value (e.g `$0,00`) | |
| **fractionDigits** | `number` | `2` | is used for define the quantity of decimals digits | |
| **negativeSignAfter** | `boolean` | `false` | is used for define if negative sign should be after the number | |
| **prefix** | `string` | `""` | is used for define a string that always precedes its value | |
| **suffix** | `string` | `""` | is used for define a string that always follows its value | |
| **thousandsSeparator** | `string` | `"."` | is used for define the separator of thousands digits | |

### Example SimpleMaskMoneyConfiguration

**Example** with all avaliable options:

```javascript
const configuration = {
  afterFormat(e) { console.log('afterFormat', e); },
  beforeFormat(e) { console.log('beforeFormat', e); },
  
  allowNegative: false,
  negativeSignAfter: false,
  
  decimalSeparator: ',',
  fractionDigits: 2,
  thousandsSeparator: '.',
  
  cursor: 'end',

  fixed: true,
  
  prefix: '',
  suffix: '',
};
```

## SimpleMaskMoney.setMask

The `setMask` function is used to apply a mask to an input element, formatting its value as a currency. The function listens for keyboard events on the input element and updates its value accordingly. It also handles caret positioning and allows for undoing changes. The function returns a method to remove the mask from the input element.

The **setMask function typings**:

```typescript
type setMask = (input: HTMLInputElement | string | null, configuration?: SimpleMaskMoneyConfiguration) => () => void;
```

The **arguments** they are:

It takes two arguments, an [input element of type text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) which can be a [CSSStringSelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#examples) and an optional [configuration](#simplemaskmoneyconfiguration) of type object.

| Name | Type | Default value | Description | Reference to internal code |
| ---- | ---- | ------------- | ----------- | -------------------------- |
| **input** | `HTMLInputElement` &#124; `string` &#124; `null` | None | is used for define whats the input which will receive the mask | |
| **configuration** | [SimpleMaskMoneyConfiguration](#simplemaskmoneyconfiguration) | Check the SimpleMaskMoneyConfiguration | is used for define if allow values less than zero | |

### Example SimpleMaskMoney.setMask using with Vanilla JS

You need import the simple-mask-money script and define an input element of type text

```html
<script src="/simple-mask-money.umd.js"></script>
<!-- With default args -->
<input type="text" id="#my-input">
```

Use the query selector

```javascript
const configuration = { /** check the avaliable configuration */ };
// With default args
const remove = SimpleMaskMoney.setMask('#my-input', configuration); // With an input as QuerySelector 
remove(); // Execute to remove the input mask
```

Or if you prefer **pass the input element**

```javascript
const element = document.getElementById('#my-input'); // With an input as element
const configuration = { /** check the avaliable configuration */ };

const remove = SimpleMaskMoney.setMask(element, configuration);
remove(); // Execute to remove the input mask
```

### Example SimpleMaskMoney.setMask using with React JS

Using **with default configuration** and **query selector**:

```tsx
// Example with default configuration
import { useEffect } from 'react';
import { setMask } from 'simple-mask-money';

function InputMoneyComponent() {
  useEffect(() => setMask('#my-input'), [])
  return <input type="text" id="#my-input" />
}
```

To define your **custom configuration**:

```tsx
// Example with custom configuration
import { useEffect } from 'react';
import { setMask } from 'simple-mask-money';

const configuration = { /** check the avaliable configuration */ };

function InputMoneyComponent() {
  useEffect(() => setMask('#my-input', configuration), [])
  return <input type="text" id="#my-input" />
}
```

Or if you prefer **pass the input element** using a ref:

```tsx
// Example with custom configuration using ref
import { useEffect, useRef } from 'react';
import { setMask } from 'simple-mask-money';

const configuration = { /** check the avaliable configuration */ };

function InputMoneyComponent() {
  const inputRef = useRef(null);
  useEffect(() => setMask(input.current, configuration), [])
  
  return <input ref={inputRef} type="text" />
}
```

## SimpleMaskMoney.removeMask

The `removeMask` function returns a function which is used to remove a mask from an input element.

The **setMask function typings**:

```typescript
type setMask = (input: HTMLInputElement | string | null) => () => void;
```

The **argument** is:

It takes a argument, which is [input element of type text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) which can be a [CSSStringSelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#examples).

| Name | Type | Default value | Description | Reference to internal code |
| ---- | ---- | ------------- | ----------- | -------------------------- |
| **input** | `HTMLInputElement` &#124; `string` &#124; `null` | None | is used for define whats the input which will receive the mask | |

> ⚠️ You need to have an input element with a mask applied.

### Example SimpleMaskMoney.removeMask using with Vanilla JS

Use the query selector

```javascript
const remove = SimpleMaskMoney.removeMask('#my-input'); // With an input as QuerySelector 
remove(); // Execute to remove the input mask
```

Or if you prefer **pass the input element**

```javascript
const element = document.getElementById('#my-input'); // With an input as element
const configuration = { /** check the avaliable configuration */ };

const remove = SimpleMaskMoney.setMask(element, configuration);
remove(); // Execute to remove the input mask
```

### Example SimpleMaskMoney.removeMask using with React JS

Using **with react** and **query selector**:

```tsx
import { useEffect } from 'react';
import { removeMask } from 'simple-mask-money';

function InputMoneyComponent() {
  useEffect(() => removeMask('#my-input'), [])
  return <input type="text" id="#my-input">
}
```

Or if you prefer **pass the input element** using a ref:

```tsx
// Example using ref
import { useEffect, useRef } from 'react';
import { removeMask } from 'simple-mask-money';

function InputMoneyComponent() {
  const inputRef = useRef(null);
  useEffect(() => removeMask(input.current), [])
  
  return <input ref={inputRef} type="text">
}
```

## SimpleMaskMoney.formatToCurrency

The `formatToCurrency` formats the input value as a currency string based on the provided configuration and returns the formatted output. It takes a number or string value and an optional configuration object as input.

The **formatToCurrency function typings**:

```typescript
type FormatToCurrencyFunction = (value: string | number, configuration?: SimpleMaskMoneyConfiguration) => string;
```

The **arguments** they are:

It takes two arguments, the value which can be a `string` or `number` and an optional [configuration](#simplemaskmoneyconfiguration) of type object.

| Name | Type | Default value | Description | Reference to internal code |
| ---- | ---- | ------------- | ----------- | -------------------------- |
| **value** | `string` &#124; `number` | None | is the value to format can be a number or a formatted string for example: `0.99` or `$0,99` | |
| **configuration** | [SimpleMaskMoneyConfiguration](#simplemaskmoneyconfiguration) | Check the SimpleMaskMoneyConfiguration | is used for define if allow values less than zero | |

### Example SimpleMaskMoney.formatToCurrency CJS

```javascript
const SimpleMaskMoney = require('simple-mask-money');
// With string value
SimpleMaskMoney.formatToCurrency(123456789); // 1.234.567,89
// With string value
SimpleMaskMoney.formatToCurrency('123456789'); // 1.234.567,89
// With custom configuration
SimpleMaskMoney.formatToCurrency('123456789', { prefix: '$' }); // $1.234.567,89
```

Or you can import only this function using:

```javascript
const formatToCurrency = require('simple-mask-money/format-to-currency');
// With string value
formatToCurrency(123456789); // 1.234.567,89
// With string value
formatToCurrency('123456789'); // 1.234.567,89
// With custom configuration
formatToCurrency('123456789', { prefix: '$' }); // $1.234.567,89
```

### Example SimpleMaskMoney.formatToCurrency ESM

```javascript
import { formatToCurrency } from 'simple-mask-money';
// With string value
formatToCurrency(123456789); // 1.234.567,89
// With string value
formatToCurrency('123456789'); // 1.234.567,89
// With custom configuration
formatToCurrency('123456789', { prefix: '$' }); // $1.234.567,89
```

Or you can import as default:

```javascript
import formatToCurrency from 'simple-mask-money/format-to-currency';
// With string value
formatToCurrency(123456789); // 1.234.567,89
// With string value
formatToCurrency('123456789'); // 1.234.567,89
// With custom configuration
formatToCurrency('123456789', { prefix: '$' }); // $1.234.567,89
```

## SimpleMaskMoney.formatToNumber

The `formatToNumber` removes any non-numeric characters from the input string and returns a number.

The **formatToNumber function typings**:

```typescript
type FormatToNumberFunction = (value: string | number, configuration?: SimpleMaskMoneyConfiguration) => number;
```

The **arguments** they are:

It takes two arguments, the value which can be a `string` or `number` and an optional [configuration](#simplemaskmoneyconfiguration) of type object.

| Name | Type | Default value | Description | Reference to internal code |
| ---- | ---- | ------------- | ----------- | -------------------------- |
| **value** | `string` &#124; `number` | None | is the value to format can be a number or a formatted string for example: `0.99` or `$0,99` | |
| **configuration** | [SimpleMaskMoneyConfiguration](#simplemaskmoneyconfiguration) | Check the SimpleMaskMoneyConfiguration | is used for define if allow values less than zero | |

### Example SimpleMaskMoney.formatToNumber CJS

```javascript
const SimpleMaskMoney = require('simple-mask-money');
// With string value
SimpleMaskMoney.formatToNumber('$1.250,99AUD'); // 1.250,999
```

Or you can import only this function using:

```javascript
const formatToNumber = require('simple-mask-money/format-to-number');
// With string value
formatToNumber('$1.250,99AUD'); // 1.250,999
```

### Example SimpleMaskMoney.formatToNumber ESM

```javascript
import { formatToNumber } from 'simple-mask-money';
// With string value
formatToNumber('$1.250,99AUD'); // 1.250,999
```

Or you can import as default:

```javascript
import formatToNumber from 'simple-mask-money/format-to-number';
// With string value
formatToNumber('$1.250,99AUD'); // 1.250,999
```

## SimpleMaskMoney.createInstanceOf

The `createInstanceOf` returns a new function that has default values for the configuration parameter. Allowing you to create instances of a function with different configurations without modifying the original function.

The **createInstanceOf function typings**:

```typescript
type CreateInstanceOfFunction = <P, R>(value: (param: P, configuration?: OptionalSimpleMaskMoneyConfiguration) => R, configuration?: SimpleMaskMoneyConfiguration) => (param: P, configuration: OptionalSimpleMaskMoneyConfiguration) => R;
```

The **arguments** they are:

It takes two arguments, the first some of these functions of SimpleMaskMoney (`setMask`, `formatToCurrency` or `formatToNumber`) which should receive a configuration and a [configuration](#simplemaskmoneyconfiguration) of type object.

| Name | Type | Default value | Description | Reference to internal code |
| ---- | ---- | ------------- | ----------- | -------------------------- |
| **fn** | `(param: P, configuration?: OptionalSimpleMaskMoneyConfiguration) => R` | None | is some of these functions of SimpleMaskMoney (`setMask`, `formatToCurrency` or `formatToNumber`) | |
| **configuration** | [SimpleMaskMoneyConfiguration](#simplemaskmoneyconfiguration) | Check the SimpleMaskMoneyConfiguration | is used for define if allow values less than zero | |

### Example SimpleMaskMoney.createInstanceOf CJS

```javascript
const SimpleMaskMoney = require('simple-mask-money');
// Create a function with different default configuration
const formatToUSD = SimpleMaskMoney.createInstanceOf(SimpleMaskMoney.formatToCurrency, { prefix: '$', suffix: 'USD' });
const formatToAUD = SimpleMaskMoney.createInstanceOf(SimpleMaskMoney.formatToCurrency, { prefix: '$', suffix: 'AUD' });
// Now you can call without the configuration
formatToAUD(1.250,999); // $1.250,99AUD
formatToUSD(1.250,999); // $1.250,99USD
```

Or you can import only this function using:

```javascript
const createInstanceOf = require('simple-mask-money/create-instance-of');
const formatToCurrency = require('simple-mask-money/format-to-currency');
// Create a function with different default configuration
const formatToUSD = createInstanceOf(formatToCurrency, { prefix: '$', suffix: 'USD' });
const formatToAUD = createInstanceOf(formatToCurrency, { prefix: '$', suffix: 'AUD' });
// Now you can call without the configuration
formatToAUD(1.250,999); // $1.250,99AUD
formatToUSD(1.250,999); // $1.250,99USD
```

### Example SimpleMaskMoney.createInstanceOf ESM

```javascript
import { createInstanceOf, formatToCurrency } from 'simple-mask-money';
// Create a function with different default configuration
const formatToUSD = createInstanceOf(formatToCurrency, { prefix: '$', suffix: 'USD' });
const formatToAUD = createInstanceOf(formatToCurrency, { prefix: '$', suffix: 'AUD' });
// Now you can call without the configuration
formatToAUD(1.250,999); // $1.250,99AUD
formatToUSD(1.250,999); // $1.250,99USD
```

Or you can import as default:

```javascript
import createInstanceOf from 'simple-mask-money/create-instance-of';
import formatToCurrency from 'simple-mask-money/format-to-currency';
// Create a function with different default configuration
const formatToUSD = createInstanceOf(formatToCurrency, { prefix: '$', suffix: 'USD' });
const formatToAUD = createInstanceOf(formatToCurrency, { prefix: '$', suffix: 'AUD' });
// Now you can call without the configuration
formatToAUD(1.250,999); // $1.250,99AUD
formatToUSD(1.250,999); // $1.250,99USD
```
