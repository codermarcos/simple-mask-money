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

  static format(value) {
    return _core.numberToText(_core.textToNumber(value));
  }

  static formatToNumber(input) {
    let retorno = '0';
    let value = _core.textToNumber(input);

    if (parseFloat(value) !== 'NaN') {
      if (value.length <= _args.fractionDigits) {
        value = _core.formatDecimal(value, '0', '.');
      } else {
        let lengthWithoutDecimals = value.length - _args.fractionDigits;
        value = value.replace(
          new RegExp(
            `(\\d{${lengthWithoutDecimals}})(\\d{${_args.fractionDigits}})`
          ),
          '$1.$2'
        );
      }

      retorno = value;
    }

    return parseFloat(retorno);
  }

  static setMask(element, args) {
    if (typeof document === 'undefined') throw 'This function only works on client side';

    const input = typeof element == 'string' ? document.querySelector(element) : element;

    if (args) {
      SimpleMaskMoney.args = args;
    }

    input.addEventListener('input', e => {
      const oldValue = input.value;
      const newValue = SimpleMaskMoney.format(oldValue);
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
    });

    input['formatToNumber'] = () => SimpleMaskMoney.formatToNumber(input.value);

    return input;
  }
};
