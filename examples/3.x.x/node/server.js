const SimpleMaskMoney = require('simple-mask-money');

// Default configuration  
SimpleMaskMoney.args = {
  afterFormat(e) { console.log('afterFormat', e); },
  allowNegative: false,
  beforeFormat(e) { console.log('beforeFormat', e); },
  negativeSignAfter: false,
  prefix: '$ ',
  suffix: '',
  fixed: true,
  fractionDigits: 2,
  decimalSeparator: ',',
  thousandsSeparator: '.'
};

// Format to currency
console.log(SimpleMaskMoney.format(321118));

// Format to number
console.log(SimpleMaskMoney.formatToNumber('$ 3.211,18')); 
