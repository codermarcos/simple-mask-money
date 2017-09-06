# simple-mask-money
Simple money mask developed with pure JavaScript
## Getting Started

```shell
  npm i simple-mask-money --save
```
```html
    <script src="node_modules/simple-mask-money/simple-mask-money.js"></script>
    <!-- or -->
    <script src="node_modules/simple-mask-money/simple-mask-money.js"></script>
```
```javascript 
    <script>
      let input = document.getElementsByTagName('input')[0];
      
      // configuration

      let args = {
        preffix: '',
        suffix: '',
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ',',
        thousandsSeparator: '.'
      };

      SimpleMaskMoney.args = args;
      
      input.oninput = () => {
        input.value = SimpleMaskMoney.format(input.value);
      };
    </script>
````
