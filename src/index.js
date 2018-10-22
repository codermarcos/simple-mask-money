const Args = require('./args');
const Core = require('./core');
const implanter = require('./implanter');

let _args = new Args();
let _core = new Core(_args);

module.exports = class SimpleMaskMoney {
  static get args() {
    return _args;
  }

  static set args(value) {
    _args = new Args(value);
    _core = new Core(_args);
  }

  static format(value, args, isInput = false) {
    let core;
    if (typeof args !== 'undefined') {
      args = new Args(args);
      core = new Core(args);
    } else {
      args = _args;
      core = _core;
    }

    const negative = args.allowNegative && value.indexOf('-') !== -1;  
    const formatation = core.numberToText(core.textToNumber(value, isInput));
    
    return `${!args.negativeSignAfter && negative ? '-': ''}${formatation}${args.negativeSignAfter && negative ? '-': ''}`;
  }

  static formatToNumber(input, args) {
    let value = input.toString(); 
    let retorno = '0';
    let core;
    if (typeof args !== 'undefined') {
      args = new Args(args);
      core = new Core(args);
    } else {
      args = _args;
      core = _core;
    }

    const negative = args.allowNegative && value.indexOf('-') !== -1;   
    
    if (negative) {
      value = value.replace('-', '');
    }

    value = core.textToNumber(value);
    if (!isNaN(parseFloat(value))) {
      retorno = value;
    }
      
    return parseFloat(negative ? retorno * -1 : retorno);
  }

  static setMask(element, args) {
    if (typeof document === 'undefined') throw 'This function only works on client side';

    const input = typeof element == 'string' ? document.querySelector(element) : element;    
    input.maskArgs = args || SimpleMaskMoney.args;

    input.addEventListener('input', e => {
      const oldValue = input.value;
      const newValue = SimpleMaskMoney.format(oldValue, input.maskArgs, true);
      const caretPosition = implanter.getCaretPosition(input);
      const move = implanter.indexMove(newValue, oldValue);
      let newCaretPosition = caretPosition - move;
      const {cursor} = input.maskArgs;

      if (cursor === 'start') {
        newCaretPosition = 0;
      } else if (cursor === 'end') {
        newCaretPosition = newValue.length;
      }

      input.value = newValue;
      input._value = newValue;

      implanter.setCaretPosition(input, newCaretPosition);

      !(e instanceof Event) && input.dispatchEvent(new Event('input'));
    });

    input.formatToNumber = () => SimpleMaskMoney.formatToNumber(input.value, input.maskArgs);

    return input;
  }
};
