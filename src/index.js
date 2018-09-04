const Args = require('./args');
const Core = require('./core');

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
    const input = typeof element == 'string' ? document.querySelector(element) : element;
    const setCaretPosition = index => {
      if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(index, index);
      } else if (input.createTextRange) {
        const range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', index);
        range.moveStart('character', index);
        range.select();
      }
    };

    if (args) SimpleMaskMoney.args = args;

    input.addEventListener('input', () => {
      const position = input.selectionStart;
      const oldValue = input.value;
      const newValue = SimpleMaskMoney.format(oldValue);
      input.value = newValue;
      let remove;

      switch (true) {
        case oldValue.length < newValue.length:
          remove = - 1;
          break;
        case oldValue.length > newValue.length:
          remove = 1;
          break;
        default:
          remove = 0;
          break;
      }

      setCaretPosition(position - remove);
    });

    input['formatToNumber'] = () => SimpleMaskMoney.formatToNumber(input.value);

    return input;
  }
};
