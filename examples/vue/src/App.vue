<template>
  <div id="app">
    <!-- 
      Put inputmode numeric to mobile show numeric keyboard
     -->
    <input type="text" id="myInput" inputmode="numeric" v-model="val" @keyup="send($event)">
  </div>
</template>

<script>
import SimpleMaskMoney from "../../../lib/simple-mask-money"; // import mask

export default {
  data() {
    // Your value
    return {
      val: "0,00"
    };
  },
  mounted() {
    // configuration
    const options = {
      prefix: '',
      suffix: '',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.'
    };
    // set mask on your input you can pass a querySelector or your input element and options
    SimpleMaskMoney.setMask('#myInput', options);
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
<style>
@import url("https://fonts.googleapis.com/css?family=Slabo+27px");
* {
  border: 0 none;
  color: #fff;
  font-family: "Slabo 27px", serif;
  margin: 0;
  padding: 0;
  text-align: center;
}

body {
  background-color: #222;
  height: 100vh;
}

input {
  background-color: transparent;
  color: red;
  font-size: 10vw;
  text-shadow: 0px 0px 0px #fff;
  width: 80vw;
  -webkit-text-fill-color: transparent;
}

input::-webkit-input-placeholder {
  text-shadow: none;
  -webkit-text-fill-color: initial;
}

div {
  padding-top: 20px;
}
</style>
