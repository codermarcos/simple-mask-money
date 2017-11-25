this.SimpleMaskMoney = (() => {
  let _args = {
    prefix: '',
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    autoCompleteDecimal: false,
    emptyOrInvalid: () => {
      return this.SimpleMaskMoney.args.fixed
        ? `0${this.SimpleMaskMoney.args.decimalSeparator}00`
        : `_${this.SimpleMaskMoney.args.decimalSeparator}__`;
    }
  };

  return {
    get args() {
      return _args;
    },
    set args(value) {
      _args = Object.assign(_args, value);
      _args.prefix = value.prefix || value.preffix;
    },

    onlyNumber: value => {
      let retorno = '';

      for (let i = 0; i < value.length; i++) {
        if (isFinite(value[i])) {
          retorno += value[i];
        }
      }

      return retorno;
    },

    addingPrefix: value => {
      return `${this.SimpleMaskMoney.args.prefix}${value}`;
    },
    removingPrefix: value => {
      return value.replace(this.SimpleMaskMoney.args.prefix, '');
    },

    addingSuffix: value => {
      return `${value}${this.SimpleMaskMoney.args.suffix}`;
    },
    removingSuffix: value => {
      if (
        value.includes(
          this.SimpleMaskMoney.args.suffix,
          value.length - this.SimpleMaskMoney.args.fractionDigits
        )
      ) {
        value = value.replace(this.SimpleMaskMoney.args.suffix, '');
      } else {
        value = value.substring(0, value.length - 1);
      }
      return value;
    },

    addingCompleterFromStart: (value, completer) => {
      while (value.length < this.SimpleMaskMoney.args.fractionDigits) {
        value = `${completer}${value}`;
      }
      return value;
    },

    addingCompleterFromEnd: (value, completer) => {
      while (value.length < this.SimpleMaskMoney.args.fractionDigits) {
        value = `${value}${completer}`;
      }
      return value;
    },

    removingCompleterFromStart: (value, completer) => {
      while (value[0] === completer) {
        value = value.replace(completer, '');
      }
      return value;
    },

    removingCompleterFromEnd: (value, completer) => {
      while (value[value.length - 1] === completer) {
        value = value.substring(0, value.length - 1);
      }
      return value;
    },

    addingAutoComplete: value => {
      const n = `${value}${this.SimpleMaskMoney.addingCompleterFromEnd(
        '',
        '0'
      )}`;
      return n;
    },

    autoComplete: value => {
      const array =
        value.match(
          new RegExp(`\\${this.SimpleMaskMoney.args.decimalSeparator}`, 'g')
        ) || [];
      if (array.length > 1) {
        value = this.SimpleMaskMoney.addingAutoComplete(value);
      }
      return value;
    },

    addingDecimalSeparator: (value, completer, separator) => {
      let length = value.length - this.SimpleMaskMoney.args.fractionDigits;

      let regexpFraction;
      let decimals = '$1';
      let dezenas = completer;
      let character = isFinite(completer) ? 'd' : 'w';

      regexpFraction = `(\\${character}{${this.SimpleMaskMoney.args
        .fractionDigits}})`;
      if (length > 0) {
        regexpFraction = `(\\${character}{${length}})${regexpFraction}`;
        dezenas = decimals;
        decimals = '$2';
      }

      return value.replace(
        new RegExp(regexpFraction),
        `${dezenas}${separator}${decimals}`
      );
    },

    addingHundredsSeparator: value => {
      let size = value.length - this.SimpleMaskMoney.args.fractionDigits;
      let hundreds = Math.ceil(size / 3);
      let regexpHundreds = '(\\d)';

      let replacement = `${this.SimpleMaskMoney.args
        .decimalSeparator}$${hundreds + 1}`;

      for (let i = hundreds; i !== 0; i--) {
        if (size >= 3) {
          regexpHundreds = `(\\d{3})${regexpHundreds}`;
          size -= 3;
        } else {
          regexpHundreds = `(\\d{${size}})${regexpHundreds}`;
        }

        if (i > 1) {
          replacement = `${this.SimpleMaskMoney.args
            .thousandsSeparator}$${i}${replacement}`;
        } else {
          replacement = `$${i}${replacement}`;
        }
      }

      return value.replace(new RegExp(regexpHundreds), replacement);
    },
    removeSeparator: (value, separator) => {
      return value.replace(new RegExp(`\\${separator}`, 'g'), '');
    },
    formatDecimal: (value, completer, separator) => {
      value = this.SimpleMaskMoney.addingCompleterFromStart(value, completer);
      value = this.SimpleMaskMoney.addingDecimalSeparator(
        value,
        completer,
        separator
      );
      return value;
    },

    textToNumber: input => {
      let retorno = input.toString();
      let completer = this.SimpleMaskMoney.args.fixed ? '0' : '_';

      if (this.SimpleMaskMoney.args.prefix) {
        retorno = this.SimpleMaskMoney.removingPrefix(retorno);
      }

      if (this.SimpleMaskMoney.args.suffix) {
        retorno = this.SimpleMaskMoney.removingSuffix(retorno);
      }

      if (this.SimpleMaskMoney.args.autoCompleteDecimal) {
        retorno = this.SimpleMaskMoney.autoComplete(retorno);
      }

      retorno = this.SimpleMaskMoney.removeSeparator(
        retorno,
        this.SimpleMaskMoney.args.thousandsSeparator
      );
      retorno = this.SimpleMaskMoney.removeSeparator(
        retorno,
        this.SimpleMaskMoney.args.decimalSeparator
      );

      retorno = this.SimpleMaskMoney.onlyNumber(retorno);

      retorno = this.SimpleMaskMoney.removingCompleterFromStart(
        retorno,
        completer
      );

      return retorno || (this.SimpleMaskMoney.args.fixed ? '0' : '');
    },

    numberToText: input => {
      let retorno = this.SimpleMaskMoney.args.emptyOrInvalid();

      if (parseFloat(input) !== 'NaN') {
        if (input.length <= this.SimpleMaskMoney.args.fractionDigits) {
          retorno = this.SimpleMaskMoney.formatDecimal(
            input,
            this.SimpleMaskMoney.args.fixed ? '0' : '_',
            this.SimpleMaskMoney.args.decimalSeparator
          );
        } else {
          retorno = this.SimpleMaskMoney.addingHundredsSeparator(input);
        }
      }

      if (this.SimpleMaskMoney.args.prefix) {
        retorno = this.SimpleMaskMoney.addingPrefix(retorno);
      }
      if (this.SimpleMaskMoney.args.suffix) {
        retorno = this.SimpleMaskMoney.addingSuffix(retorno);
      }

      return retorno;
    },

    format: value => {
      return this.SimpleMaskMoney.numberToText(
        this.SimpleMaskMoney.textToNumber(value)
      );
    },

    formatToNumber: input => {
      let retorno = '0';
      let value = this.SimpleMaskMoney.textToNumber(input);

      if (parseFloat(value) !== 'NaN') {
        if (value.length <= this.SimpleMaskMoney.args.fractionDigits) {
          value = this.SimpleMaskMoney.formatDecimal(value, '0', '.');
        } else {
          let lengthWithoutDecimals =
            value.length - this.SimpleMaskMoney.args.fractionDigits;
          value = value.replace(
            new RegExp(
              `(\\d{${lengthWithoutDecimals}})(\\d{${this.SimpleMaskMoney.args
                .fractionDigits}})`
            ),
            '$1.$2'
          );
        }

        retorno = value;
      }

      return parseFloat(retorno);
    },

    setMask: (element, args) => {
      let input = typeof element == 'string' ? document.querySelector(element) : element;

      if (args) {
        this.SimpleMaskMoney.args = args;
      }

      input.addEventListener('input', () => {
        input.value = this.SimpleMaskMoney.format(input.value);
      });
      input['formatToNumber'] = () => {
        return this.SimpleMaskMoney.formatToNumber(input.value);
      };

      return input;
    }
  };
})();
