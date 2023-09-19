# SimpleMaskMoney Example Javascript (deprecated)

## ⚠️ Please update to version 4.x.x

First, install it.

```shell
  npm i simple-mask-money --save
```

Then, use it as follows:

```javascript
// Import library
const SimpleMaskMoney =  require('simple-mask-money');
// Default configuration
SimpleMaskMoney.args = {
  afterFormat(e) { console.log('afterFormat', e); },
  allowNegative: false,
  beforeFormat(e) { console.log('beforeFormat', e); },
  negativeSignAfter: false,
  prefix: '$ ',
  suffix: '',
  fixed: true,
  fractionDigits: 2,
  decimalSeparator: ',',
  thousandsSeparator: '.'
};

// Format to currency
SimpleMaskMoney.format(321118); // $ 3.211,18

// Format to number
SimpleMaskMoney.formatToNumber('$ 3.211,18'); // 3211.18
```
