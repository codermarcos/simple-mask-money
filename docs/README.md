# Documentation SimpleMaskMoney

The ```SimpleMaskMoney``` class hosts three methods for formatting the values and one property to configure the formatting.

## SimpleMaskMoney.args

**.args** is the property, of type object that sets the formatting:

```javascript
// Default args
SimpleMaskMoney.args = {
    prefix: '',
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.'
};
```

The **args** they are:

- **prefix**: string > *This string always precedes its value*
- **suffix**: string > *This string always procedes its value*
- **fixed**: boolean > *This boolean define if your value can be empty or always should have value*
- **fractionDigits**: number > *This number define the quantity of decimals digits*
- **decimalSeparator**: string > *This string define the separator of decimals digits*
- **thousandsSeparator**: string > *This string define the separator of thousands digits*

## SimpleMaskMoney.format(...)

**.format(...)** have one argument, the ```value``` that will be formatted to your settings:

```javascript
// With default args
SimpleMaskMoney.format('123456789'); // 1.234.567,89
```

## SimpleMaskMoney.formatToNumber(...)

**.formatToNumber(...)** have one argument, the ```value``` that will be formatted to number:

```javascript
// With default args
SimpleMaskMoney.format('$ 1.234.567,89'); // 1234567.89
```

## SimpleMaskMoney.setMask(...)

**.setMask(...)** have two arguments, the ```input``` or ```input selector``` and ```args```. 
This method get the input and implements the mask with this args:

```html
<!-- With default args -->
<input type="text" inputmode="numeric" id="#myInput">
```

Use the query selector

```javascript
// With default args
SimpleMaskMoney.setMask('#myInput', args); // 1.234.567,89
```

Or if you prefer pass the input element

```javascript
const element = document.getElementById('#myInput');

SimpleMaskMoney.setMask(element, args); // 1.234.567,89
```

