# SimpleMaskMoney Example Vue

## Getting started

First, install it.

```shell
  npm i simple-mask-money --save
```

Then, use it as follows:

```html
<template>
  <form @submit.prevent={send}>
    <input type="text" id="my-input" />
  </form>
</template>

<script>
import { setMask, formatToNumber } from 'simple-mask-money'; // import mask

export default {
  data() {
    // Your value
    return {
      val: '0,00'
    }
  },
  mounted() {
    // set mask on your input you can passing a querySelector
    SimpleMaskMoney.setMask('#my-input');
  },
  beforeUnmount() {
    SimpleMaskMoney.removeMask('#my-input');
  },
  methods: {
    // Your send method
    send() {
      // This method return value as number
      formatToNumber(this.val); // 0.00
    }
  }
}
</script>
```
