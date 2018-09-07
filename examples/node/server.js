const SimpleMaskMoney =  require('../../lib/simple-mask-money');

SimpleMaskMoney.args = {
  allowNegative: false,
  negativeSignAfter: false,
  prefix: '$ ',
  suffix: '',
  fixed: true,
  fractionDigits: 2,
  decimalSeparator: ',',
  thousandsSeparator: '.'
};


console.log(SimpleMaskMoney.format(321118)); // $ 3.211,18


console.log(SimpleMaskMoney.formatToNumber('$ 3.211,18')); // 3211.18
