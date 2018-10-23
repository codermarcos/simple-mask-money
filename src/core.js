const Args = require('./args');
module.exports = class Core {
  constructor(args) {
    this.args = new Args(args);
  }

  isFloat(number) {
    return number % 1 !== 0;
  }

  completer(size = 1) {
    return this.args.fixed ? ''.padEnd(size, '0') : ''.padEnd(size, '_');
  }

  emptyOrInvalid() {
    return `${this.completer()}${this.args.decimalSeparator}${this.completer(this.args.fractionDigits)}`;
  }

  onlyNumber(value) {
    const hasDecimalSeparator = value.toString().indexOf(this.args.decimalSeparator);
    let putDecimalSeparator = false;
    let retorno = '';

    for (let i = value.length - 1; i >= 0; i--) {
      if (isFinite(value[i])) {
        retorno = value[i] + retorno;
      } else if (hasDecimalSeparator !== -1 && !putDecimalSeparator && value[i] === this.args.decimalSeparator) {
        retorno = value[i].replace(this.args.decimalSeparator, '.') + retorno;
        putDecimalSeparator = true;
      }
    }

    return retorno[0] === '.' ? `0${retorno}` : retorno;
  }

  addingPrefix(value) {
    return `${this.args.prefix}${value}`;
  }

  removingPrefix(value) {
    const position = value.indexOf(this.args.prefix, 0);

    if (position !== -1) {
      value = value.substring(this.args.prefix.length, value.length);
    }

    return value;
  }

  addingSuffix(value) {
    return `${value}${this.args.suffix}`;
  }

  removingSuffix(value) {
    const position = value.indexOf(this.args.suffix, value.length - this.args.suffix.length);

    if (position !== -1) {
      const start = value.substring(0, position);
      value = start + value.substring(start.length + this.args.suffix.length - 1, value.length - 1);
    }

    return value;
  }

  addingCompleter(value, completer, length, start = true) {
    while (value.length < length) {
      value = start ? `${completer}${value}` : `${value}${completer}`;
    }

    return value;
  }

  removingCompleter(value, completer, start = true) {
    const position = start ? 0 : value.length - 1;

    while (value[position] === completer) {
      value = value.substring(0, position - 1) + value.substring(position + 1, value.length);
    }

    return value;
  }

  addingSeparators(value) {
    let size = value.length - this.args.fractionDigits;
    let character = this.args.fixed ? 'd' : 'w';
    let regexp = `\\,?||\\.?(\\${character})`;
    let hundreds = Math.ceil(size / 3);

    let replacement = `${this.args.decimalSeparator}$${hundreds + 1}`;

    for (let i = hundreds; i !== 0; i--) {
      if (size >= 3) {
        regexp = `(\\${character}{3})${regexp}`;
        size -= 3;
      } else {
        regexp = `(\\${character}{${size}})${regexp}`;
      }

      if (i > 1) {
        replacement = `${this.args.thousandsSeparator}$${i}${replacement}`;
      } else {
        replacement = `$${i}${replacement}`;
      }
    }

    return value.replace(new RegExp(regexp), replacement);
  }

  replaceSeparator(value, separator, replacer = '') {
    return value.replace(new RegExp(`\\${separator}`, 'g'), replacer);
  }

  adjustDotPosition(value) {
    let fractionDigits;
    let retorno = value.toString();

    retorno = retorno.replace('.', '');
    fractionDigits = retorno.length - this.args.fractionDigits;
    retorno = `${retorno.substring(0, fractionDigits)}.${retorno.substring(fractionDigits)}`;

    return retorno;
  }

  checkNumberStart(value) {
    const retorno = value.toString();
    return retorno[0] === '.' ? `0${retorno}` : retorno;
  }

  textToNumber(value, input) {
    let retorno = value.toString();
    let completer = this.completer();

    if (this.args.prefix) {
      retorno = this.removingPrefix(retorno);
    }

    if (this.args.suffix) {
      retorno = this.removingSuffix(retorno);
    }

    retorno = this.onlyNumber(retorno);

    if (retorno) {
      if (input) {
        retorno = this.adjustDotPosition(retorno);
      }

      retorno = this.removingCompleter(retorno, completer);

      retorno = this.checkNumberStart(retorno);
    }

    return retorno || (this.args.fixed ? '0' : '');
  }

  numberToText(value) {
    let retorno = this.emptyOrInvalid();
    value = this.replaceSeparator(value.toString(), this.args.decimalSeparator, '.');

    if (!isNaN(parseFloat(value))) {
      if (this.isFloat(value)) {
        const number = value.split('.');
        let hundreds = number[0];
        let decimals = number[1];

        decimals = this.addingCompleter(decimals || '', this.completer(), this.args.fractionDigits, false);

        retorno = `${hundreds}${decimals}`;
      } else {
        retorno = this.replaceSeparator(value, '.');
        retorno = this.addingCompleter(retorno || '', this.completer(), this.args.fractionDigits);
        retorno = this.args.fractionDigits >= retorno.length ? `${this.completer()}${retorno}` : retorno;
      }

      retorno = this.addingSeparators(retorno);
    }

    if (this.args.prefix) {
      retorno = this.addingPrefix(retorno);
    }
    if (this.args.suffix) {
      retorno = this.addingSuffix(retorno);
    }

    return retorno;
  }
};
