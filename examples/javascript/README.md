# SimpleMaskMoney Exemple Javascript
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
    <input inputmode="numeric" onkeyup="send(event)" value="0,00"
    oninput="this.value = SimpleMaskMoney.format(this.value)">

    <script src="./node_modules/simple-mask-money/lib/simple-mask-money.js"></script>
    <script>
      // select the element 
      let input = document.getElementsByTagName('input')[0];

      // configuration  
      SimpleMaskMoney.args = {
        preffix: '',
        suffix: '',
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ',',
        thousandsSeparator: '.',
        autoCompleteDecimal: false
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
### Get the exemple

To see an example of the code running, follow these steps:
1. Clone the repository
```shell
  git clone https://github.com/codermarcos/simple-mask-money.git
```
2. Enter on repository
```shell
  cd implementing/exemples/javascript
```
3. Install dependencies 
```shell
  npm i 
```
4. start project 
```shell
  npm start
```
5. open browser 
```shell
  start "http://localhost:4200"
```