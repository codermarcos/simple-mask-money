# SimpleMaskMoney Example Vue

First, install it.

```shell
  npm i simple-mask-money --save
```

Then, use it as follows:

```html
<template>
  <div>
    <!-- 
      Put inputmode numeric to mobile show numeric keyboard
     -->
    <input type="text" id="myInput" inputmode="numeric" v-model="val" @keyup="send($event)">
  </div>
</template>

<script>
import {
  SimpleMaskMoney
} from 'simple-mask-money/lib/simple-mask-money'; // import mask

export default {
  data() {
    // Your value
    return {
      val: '0,00'
    }
  },
  mounted() {
    // Default configuration  
    const args = {
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
    SimpleMaskMoney.setMask('#myInput', args);
  },
  methods: {
    // Your send method
    send(e) {
        if (e.key !== "Enter") return;
      // This method return value of your input in format number to save in your database
      SimpleMaskMoney.formatToNumber(this.val);
    }
  }
}
</script>
```

## Get the exemple

To see an example of the code running, follow these steps:

1. Clone the repository

```shell
  git clone https://github.com/codermarcos/simple-mask-money.git
```

2. Enter on repository

```shell
  cd simple-mask-money/exemples/vue
```

3. Install dependencies

```shell
  npm i
```

4. start project

```shell
  npm start
```

5. open browser in [http://localhost:8080](http://localhost:8080)

```shell
  start "http://localhost:8080"
```
