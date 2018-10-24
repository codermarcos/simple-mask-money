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

  static format(value, args, input = false) {
    const _arguments = new Args(Object.assign({}, _args, args));
    _core = new Core(_arguments);

    const negative = _arguments.allowNegative && value.indexOf('-') !== -1;  
    const formatation = _core.numberToText(_core.textToNumber(value, input));

    return `${!_arguments.negativeSignAfter && negative ? '-': ''}${formatation}${_arguments.negativeSignAfter && negative ? '-': ''}`;
  }

  static formatToNumber(input, args) {
    const _arguments = new Args(Object.assign({}, _args, args));
    _core = new Core(_arguments);

    let value = input.toString(); 
    let retorno = '0';
    const negative = _arguments.allowNegative && value.indexOf('-') !== -1;   
    
    if (negative) {
      value = value.replace('-', '');
    }

    value = _core.textToNumber(value, true, false);
    if (!isNaN(parseFloat(value))) {
      retorno = value;
    }
      
    return parseFloat(negative ? retorno * -1 : retorno);
  }

  static setMask(element, args) {
    if (typeof document === 'undefined') throw 'This function only works on client side';

    const input = typeof element == 'string' ? document.querySelector(element) : element;    
    const _arguments = new Args(Object.assign({}, _args, args));
    input.maskArgs = _arguments;

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
