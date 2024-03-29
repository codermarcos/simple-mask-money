# SimpleMaskMoney Example Javascript (deprecated)

## ⚠️ Please update to version 4.x.x

First, install it.

```shell
  npm i simple-mask-money --save
```

Then, use it as follows:

```html
  <body>
    <!-- 
      Put inputmode numeric to mobile show numeric keyboard
     -->
    <input inputmode="numeric" onkeyup="send(event)" value="0,00">

    <script src="./node_modules/simple-mask-money/lib/simple-mask-money.js"></script>
    <script>
      // Default configuration  
      const options = {
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

      // set mask on your input you can pass a querySelector or your input element and options
      let input = SimpleMaskMoney.setMask('#myInput', options);

      // Your send method
      send = (e) => {
        if (e.key !== "Enter") return;
        // This method return value of your input in format number to save in your database
        console.log( input.formatToNumber() );
      }
    </script>
  </body>
```

Or if you prefer use the methods in your events

```html
  <body>
    <!-- 
      Put inputmode numeric to mobile show numeric keyboard
     -->
    <input inputmode="numeric" onkeyup="send(event)" value="0,00"
    oninput="this.value = SimpleMaskMoney.format(this.value)">

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

      // Your send method
      send = (e) => {
        if (e.key !== "Enter") return;
        // This method return value of your input in format number to save in your database
        SimpleMaskMoney.formatToNumber(input.value);
      }
    </script>
  </body>
```
