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

  onlyNumberInput(value, permitNonFixed = true) {
    const hasDecimalSeparator = value.toString().indexOf(this.args.decimalSeparator);
    const completer = this.completer();
    let putDecimalSeparator = false;
    let retorno = '';
    for (let i = value.length - 1; i >= 0; i--) {
      if (isFinite(value[i]) || (!this.args.fixed && value[i] === completer)) {
        retorno = (isFinite(value[i]) ? value[i] : (permitNonFixed ? value[i] : '0')) + retorno;
      } else if (hasDecimalSeparator !== -1 && !putDecimalSeparator && value[i] === this.args.decimalSeparator && retorno.length >= this.args.fractionDigits) {
        retorno = value[i].replace(this.args.decimalSeparator, '.') + retorno;
        putDecimalSeparator = true;
      }
    }

    retorno = this.checkNumberStart(retorno);

    return retorno;
  }

  onlyNumber(value, permitNonFixed = true) {
    const hasDecimalSeparator = value.toString().indexOf(this.args.decimalSeparator);
    const completer = this.completer();
    let putDecimalSeparator = false;
    let retorno = '';
    for (let i = value.length - 1; i >= 0; i--) {
      if (isFinite(value[i]) || (!this.args.fixed && value[i] === completer)) {
        retorno = (isFinite(value[i]) ? value[i] : (permitNonFixed ? value[i] : '0')) + retorno;
      } else if (hasDecimalSeparator !== -1 && !putDecimalSeparator && value[i] === this.args.decimalSeparator) {
        retorno = value[i].replace(this.args.decimalSeparator, '.') + retorno;
        putDecimalSeparator = true;
      }
    }

    retorno = this.checkNumberStart(retorno);

    return retorno;
  }


  isNumberNonFixed(value) {
    return !isNaN(value.replace(new RegExp('\\_', 'g'), ''));
  }

  addingPrefix(value) {
    return `${this.args.prefix}${value}`;
  }

  removingPrefix(value) {
    if (value.indexOf(this.args.prefix, 0) === -1) return value;
    return value.substring(this.args.prefix.length, value.length);
  }

  addingSuffix(value) {
    return `${value}${this.args.suffix}`;
  }

  removingSuffix(value) {
    const start = value.length - this.args.suffix.length - 1;
    if (value.indexOf(this.args.suffix, start) === -1) return value;
    return value.substring(0, value.length - this.args.suffix.length - 1);
  }

  addingCompleter(value, completer, length, start = true) {
    while (value.length < length) {
      value = start ? `${completer}${value}` : `${value}${completer}`;
    }

    return value;
  }

  removingCompleter(value, completer, start = true) {
    let retorno = value.toString();
    let position = start ? 0 : retorno.length - 1;

    while (retorno[position] === completer) {
      retorno = retorno.substring(0, position - 1) + retorno.substring(position + 1);
      position = start ? 0 : retorno.length - 1;
    }

    return retorno;
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
    let retorno = value.toString();
    const completer = this.completer();

    switch (retorno[0]) {
      case '.':
        retorno = `${completer}${retorno}`;
        break;

      case completer:
        retorno = this.removingCompleter(retorno, this.completer());
        retorno = `${completer}${retorno}`;
        break;
    }

    return retorno;
  }

  textToNumber(value, input, permitNonFixed = true) {
    let retorno = value.toString();
    let completer = this.completer();

    if (this.args.prefix) {
      retorno = this.removingPrefix(retorno);
    }

    if (this.args.suffix) {
      retorno = this.removingSuffix(retorno);
    }

    retorno = this.onlyNumber(retorno, permitNonFixed);

    if (retorno) {
      if (input && permitNonFixed && retorno.indexOf('.') !== -1) {
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

    if (!isNaN(value) || (!this.args.fixed && this.isNumberNonFixed(value))) {
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
      retorno = this.checkNumberStart(retorno);
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
