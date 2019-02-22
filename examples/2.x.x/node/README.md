# SimpleMaskMoney Exemple Node

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
  allowNegative: false,
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

## Get the exemple

To see an example of the code running, follow these steps:

1. Clone the repository

```shell
  git clone https://github.com/codermarcos/simple-mask-money.git
```

2. Enter on repository

```shell
  cd simple-mask-money/exemples/javascript
```

4. start project

```shell
  node server.js
```

5. open browser in [http://localhost:8080](http://localhost:8080)

```shell
  start "http://localhost:8080"
```
