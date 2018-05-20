<template>
  <div id="app">
    <!-- 
      Put inputmode numeric to mobile show numeric keyboard
     -->
    <input type="text" inputmode="numeric" v-model="val" 
      v-on:input="val = SimpleMaskMoney.format(val)" v-on:keyup="send($event)">
  </div>
</template>

<script>
import SimpleMaskMoney from '../../../lib/simple-mask-money'; // import mask

export default {
  data() {
    console.log(SimpleMaskMoney);
    // declare mask in your local
    return {
      SimpleMaskMoney,
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
      thousandsSeparator: '.',
      autoCompleteDecimal: false
    };
  },
  methods: {
    // Your send method 
    send(e) {
      console.log(SimpleMaskMoney);
      if (e.key !== "Enter") return;
      // This method return value of your input in format number to save in your database
      SimpleMaskMoney.formatToNumber(this.val);
    }
  }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Slabo+27px');
  * {
    border: 0 none;
    color: #fff;
    font-family: 'Slabo 27px', serif;
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
