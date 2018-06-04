import Args from './args';
import Core from './core';

export class SimpleMaskMoney {
  constructor() {
    let _args = new Args();
    let _core = new Core(_args);

    Object.defineProperty(this, 'args', {
      get() {
        return _args;
      },
      set(value) {
        _args = new Args(value);
        _core = new Core(_args);
      }
    });

    this.format = (value) => {
      return _core.numberToText(_core.textToNumber(value));
    };

    this.formatToNumber = (input) => {
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
    };

    this.setMask = (element, args) => {
      let input = typeof element == 'string' ? document.querySelector(element) : element;

      if (args) this.args = args;

      input.addEventListener('keypress', () => {
        input.value = this.format(input.value);
      });
      input.addEventListener('input', () => {
        input.value = this.format(input.value);
      });
      input['formatToNumber'] = () => {
        return this.formatToNumber(input.value);
      };

      return input;
    };
  }
}

module.exports = new SimpleMaskMoney();
