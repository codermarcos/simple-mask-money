const Args = require('./args');
const Core = require('./core');
const implanter = require('./implanter');

let _args = new Args();

module.exports = class SimpleMaskMoney {
  static get args() {
    return _args;
  }

  static set args(value) {
    _args = new Args(value);
  }

  static format(value, args) {
    const core = new Core(typeof args !== 'undefined' && typeof args === 'object' ? args : _args);

    const negative = core.args.allowNegative && value.indexOf('-') !== -1;  
    const formatation = core.numberToText(core.textToNumber(value));
    
    return `${!core.args.negativeSignAfter && negative ? '-': ''}${formatation}${core.args.negativeSignAfter && negative ? '-': ''}`;
  }

  static formatToNumber(input, args) {
    const core = new Core(typeof args !== 'undefined' && typeof args === 'object' ? args : _args);
    let value = input.toString(); 
    let retorno = '0';

    const negative = core.args.allowNegative && value.indexOf('-') !== -1;   
    
    if (negative) {
      value = value.replace('-', '');
    }

    value = core.textToNumber(value);
    
    if (!this.args.fixed) {
      value = value.replace(new RegExp('_', 'g'), '');
    }

    if (!isNaN(value)) {
      retorno = value;
    }
      
    return parseFloat(negative ? retorno * -1 : retorno);
  }

  static setMask(element, args) {
    if (typeof document === 'undefined') throw 'This function only works on client side';

    const input = typeof element == 'string' ? document.querySelector(element) : element;    
    const core = new Core(typeof args !== 'undefined' && typeof args === 'object' ? args : _args);
    
    implanter.addPropertyMask(input, core);
    implanter.addMask(input, core);
    implanter.refreshMask(input);

    input.formatToNumber = () => SimpleMaskMoney.formatToNumber(input.value, input.maskArgs);

    return input;
  }
};
