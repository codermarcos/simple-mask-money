const Args = require('./args');
const Core = require('./core');
const implanter = require('./implanter');

let _args = new Args();
let _core = new Core(_args);

module.exports = class SimpleMaskMoney {
  constructor() {
    _args = new Args();
    _core = new Core(_args);
    Object.defineProperty(this, 'args', {
      get() {
        return _args;
      },
      set(value) {
        _args = new Args(value);
        _core = new Core(_args);
      }
    });
    this.formatToNumber = SimpleMaskMoney.formatToNumber;
    this.format = SimpleMaskMoney.format;
    this.setMask = SimpleMaskMoney.setMask;
  }

  static get args() {
    return _args;
  }

  static set args(value) {
    _args = new Args(value);
    _core = new Core(_args);
  }

  static format(value, input = false) {
    const negative = _args.allowNegative && value.indexOf('-') !== -1;
    const formatation = _core.numberToText(_core.textToNumber(value, input));

    return `${!_args.negativeSignAfter && negative ? '-': ''}${formatation}${_args.negativeSignAfter && negative ? '-': ''}`;
  }

  static formatToNumber(input) {
    let value = input.toString();
    let retorno = '0';
    const negative = _args.allowNegative && value.indexOf('-') !== -1;

    if (negative) {
      value = value.replace('-', '');
    }

    value = _core.textToNumber(value);
    if (!isNaN(parseFloat(value))) {
      retorno = value;
    }

    return parseFloat(negative ? retorno * -1 : retorno);
  }

  static setMask(element, args) {
    if (typeof document === 'undefined') throw 'This function only works on client side';

    const input = typeof element == 'string' ? document.querySelector(element) : element;

    if (args) {
      SimpleMaskMoney.args = args;
    }
    input.addEventListener('focus', e => {
      this.moveCursor(input, e);
    });

    input.addEventListener('input', e => {
      this.moveCursor(input, e);
    });

    input['formatToNumber'] = () => SimpleMaskMoney.formatToNumber(input.value);

    return input;
  }
  static moveCursor(input, e){
    const oldValue = input.value;
    const newValue = SimpleMaskMoney.format(oldValue, true);
    const caretPosition = implanter.getCaretPosition(input);
    const move = implanter.indexMove(newValue, oldValue);
    let newCaretPosition = caretPosition - move;
    const {cursor} = SimpleMaskMoney.args;

    if (cursor === 'start') {
      newCaretPosition = 0;
    } else if (cursor === 'end') {
      newCaretPosition = newValue.length;
    }

    input.value = newValue;
    input._value = newValue;

    implanter.setCaretPosition(input, newCaretPosition);

    !(e instanceof Event) && input.dispatchEvent(new Event('input'));
  }
};
