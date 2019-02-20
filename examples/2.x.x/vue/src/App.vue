<template>
  <div id="app">
    <!-- 
      Put inputmode numeric to mobile show numeric keyboard
     -->
    <input type="text" id="myInput" inputmode="numeric" v-model="val" @keyup="send($event)">
  </div>
</template>

<script>
import SimpleMaskMoney from "simple-mask-money"; // import mask

export default {
  data() {
    // Your value
    return {
      val: "0,00"
    };
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
};
</script>
