# SimpleMaskMoney Example Vanilla JS

## Getting started

First, install it.

```shell
  npm i simple-mask-money --save
```

Or you can just from github cdn:

```html
<script src="/lib/simple-mask-money.umd.js"></script>
```

Then, use it as follows:

```html
<body>
  <input type="text" />

  <script>
    const optionsUSD = {
      afterFormat(e) { console.log('afterFormat', e); },
      allowNegative: false,
      beforeFormat(e) { console.log('beforeFormat', e); },
      negativeSignAfter: false,
      prefix: '$',
      suffix: '',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.',
      cursor: 'end'
    };

    SimpleMaskMoney.setMask('input', optionsUSD);
  </script>
</body>
```
