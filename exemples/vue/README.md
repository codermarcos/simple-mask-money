# SimpleMaskMoney Exemple Vue
First, install it.
```shell
  npm i simple-mask-money --save
```
Then, use it as follows:
```html
<template>
  <div>
    <!-- 
      inner html you put type text and inputmode numeric to mobile show numeric keyboard 
     -->
    <input type="text" inputmode="numeric" v-model="val" v-on:input="val = SimpleMaskMoney.format(val)">
  </div>
</template>

<script>
import { SimpleMaskMoney } from '../node_modules/simple-mask-money/lib/simple-mask-money'; // import mask

export default {
  data() {
    // declare mask in your local
    return {
      SimpleMaskMoney: SimpleMaskMoney,
      val: '0,00'
    }
  },
  created() {
    // configuration   
    SimpleMaskMoney.args = {
      preffix: '',
      suffix: '',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.'
    };
  }
}
</script>
```
