# Documentation SimpleMaskMoney 2.x.x

The ```SimpleMaskMoney``` class hosts three methods for formatting the values and one property to configure the formatting.

## SimpleMaskMoney.args

**.args** is the property, of type object that sets the formatting:

```javascript
// Default args
SimpleMaskMoney.args = {
    allowNegative: false,
    negativeSignAfter: false,
    prefix: '',
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    cursor: 'move'
};
```

The **args** they are:

- **allowNegative**: boolean > *This boolean define if allow values ​​below zero*
- **negativeSignAfter**: boolean > *This boolean define if negative sign stay after the number*
- **prefix**: string > *This string always precedes its value*
- **suffix**: string > *This string always procedes its value*
- **fixed**: boolean > *This boolean define if your value can be empty or always should have value*
- **fractionDigits**: number > *This number define the quantity of decimals digits*
- **decimalSeparator**: string > *This string define the separator of decimals digits*
- **thousandsSeparator**: string > *This string define the separator of thousands digits*
- **cursor**: string > *This string define how the cursor will move. Can be `move`, `end`, or `start`.*

## SimpleMaskMoney.format(...)

**.format(...)** have three arguments, the ```value```, ```args```(optional):

```javascript
// With default args
SimpleMaskMoney.format('123456789'); // 1.234.567,89
// With custom args
SimpleMaskMoney.format('123456789', { prefix: 'R$' }); // R$1.234.567,89
```

The **arguments** they are:

- **value**: string > *The value of your input or value that will be formatted*
- **args**: object > *This is the configurations of the formattation. If this argument is omitted the arguments defined in ```SimpleMaskMoney.args = {}``` will be used*

## SimpleMaskMoney.formatToNumber(...)

**.formatToNumber(...)** have one argument, the ```value```, ```args```(optional) that will be formatted to number:

```javascript
// With default args
SimpleMaskMoney.formatToNumber('$ 1.234.567,89'); // 1234567.89
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
