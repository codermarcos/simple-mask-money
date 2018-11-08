const Args = require('./args');
module.exports = class Core {
  constructor(args) {
    this.args = new Args(args);
  }

  addCompleter(value, completer, length, start = true) {
    while (value.length < length) {
      value = start ? `${completer}${value}` : `${value}${completer}`;
    }

    return value;
  }

  addPrefix(value) {
    return `${this.args.prefix}${value}`;
  }

  addSeparators(value) {
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

  addSuffix(value) {
    return `${value}${this.args.suffix}`;
  }

  adjustDotPosition(value) {
    let fractionDigits;
    let retorno = value.toString();

    retorno = retorno.replace('.', '');
    fractionDigits = retorno.length - this.args.fractionDigits;
    retorno = `${retorno.substring(0, fractionDigits)}.${retorno.substring(fractionDigits)}`;

    return retorno;
  }

  completer(size = 1) {
    return this.args.fixed ? ''.padEnd(size, '0') : ''.padEnd(size, '_');
  }

  checkNumberStart(value) {
    const retorno = value.toString();
    return retorno[0] === '.' ? `${this.args.fixed ? '0' : '_'}${retorno}` : retorno;
  }

  checkSuffix(value) {
    let retorno;
    const lastIndex = value.length - 1;
    const lastButOneIndex = lastIndex - 1;
    const currentLastSuffix = value.substring(lastIndex - this.args.suffix.length + 1, lastIndex + this.args.suffix.length);
    const currentLastButOneSuffix = value.substring(lastButOneIndex - this.args.suffix.length + 1, lastButOneIndex + this.args.suffix.length);

    switch (this.args.suffix) {
      case currentLastSuffix:
        retorno = value;
        break;
      case currentLastButOneSuffix:
        var start = value.substring(0, lastButOneIndex);
        retorno = `${start}${value.substring(value.length + this.args.suffix.length + 1, lastButOneIndex + this.args.suffix.length)}.`;
        break;
      default:
        retorno = `${value.substring(0, lastIndex)}.`;
        break;
    }

    return retorno;
  }

  emptyOrInvalid() {
    return `${this.completer()}${this.args.decimalSeparator}${this.completer(this.args.fractionDigits)}`;
  }

  isFloat(number) {
    return number % 1 !== 0;
  }

  mask(value) {
    const negative = this.args.allowNegative && value.indexOf('-') !== -1;
    let retorno = this.writingToNumber(value) || this.emptyOrInvalid();
    retorno = this.replaceSeparator(retorno.toString(), this.args.decimalSeparator, '.');

    if (!isNaN(retorno)) {
      retorno = this.replaceSeparator(retorno, '.');
      retorno = this.addCompleter(retorno || '', this.completer(), this.args.fractionDigits);
      retorno = this.args.fractionDigits >= retorno.length ? `${this.completer()}${retorno}` : retorno;
      retorno = this.addSeparators(retorno);
    }

    if (this.args.prefix) {
      retorno = this.addPrefix(retorno);
    }
    if (this.args.suffix) {
      retorno = this.addSuffix(retorno);
    }

    return `${!this.args.negativeSignAfter && negative ? '-' : ''}${retorno}${this.args.negativeSignAfter && negative ? '-' : ''}`;
  }

  numberToText(value) {
    let retorno = this.emptyOrInvalid();
    value = this.replaceSeparator(value.toString(), this.args.decimalSeparator, '.');

    if (!isNaN(parseFloat(value))) {
      if (this.isFloat(value)) {
        const number = value.split('.');
        let hundreds = number[0];
        let decimals = number[1];

        decimals = this.addCompleter(decimals || '', this.completer(), this.args.fractionDigits, false);

        retorno = `${hundreds}${decimals}`;
      } else {
        retorno = this.replaceSeparator(value, '.');
        retorno = this.addCompleter(retorno || '', this.completer(), this.args.fractionDigits);
        retorno = this.args.fractionDigits >= retorno.length ? `${this.completer()}${retorno}` : retorno;
      }

      retorno = this.addSeparators(retorno);
    }

    if (this.args.prefix) {
      retorno = this.addPrefix(retorno);
    }
    if (this.args.suffix) {
      retorno = this.addSuffix(retorno);
    }

    return retorno;
  }

  onlyNumber(value) {
    const hasDecimalSeparator = value.toString().indexOf(this.args.decimalSeparator);
    let putDecimalSeparator = false;
    let retorno = '';

    for (let i = value.length - 1; i >= 0; i--) {
      if (isFinite(value[i]) || (!this.args.fixed && value[i] === '_')) {
        retorno = value[i] + retorno;
      } else if (hasDecimalSeparator !== -1 && !putDecimalSeparator && value[i] === this.args.decimalSeparator) {
        retorno = value[i].replace(this.args.decimalSeparator, '.') + retorno;
        putDecimalSeparator = true;
      }
    }


    return retorno[0] === '.' ? `0${retorno}` : retorno;
  }

  removeCompleter(value, completer, start = true) {
    const getPosition = () => start ? 0 : value.length - 1;
    let position = getPosition();

    while (value[position] === completer) {
      value = value.substring(0, position - 1) + value.substring(position + 1, value.length);
      position = getPosition();
    }

    return value;
  }

  removePrefix(value) {
    const position = value.indexOf(this.args.prefix, 0);

    if (position !== -1) {
      value = value.substring(this.args.prefix.length, value.length);
    }

    return value;
  }

  removeSuffix(value) {
    const position = value.indexOf(this.args.suffix, value.length - this.args.suffix.length);

    if (position !== -1) {
      const start = value.substring(0, position);
      value = start + value.substring(start.length + this.args.suffix.length - 1, value.length - 1);
    }

    return value;
  }

  replaceSeparator(value, separator, replacer = '') {
    return value.replace(new RegExp(`\\${separator}`, 'g'), replacer);
  }

  textToNumber(value) {
    let retorno = value.toString();
    let completer = this.completer();

    if (this.args.prefix) {
      retorno = this.removePrefix(retorno);
    }

    if (this.args.suffix) {
      retorno = this.removeSuffix(retorno);
    }

    retorno = this.onlyNumber(retorno);

    if (retorno) {
      retorno = this.removeCompleter(retorno, completer);
      retorno = this.checkNumberStart(retorno);
    }

    return retorno || (this.args.fixed ? '0' : '');
  }

  writingToNumber(value) {
    let retorno = value.toString();
    let completer = this.completer();

    if (this.args.prefix) {
      retorno = this.removePrefix(retorno);
    }

    if (this.args.suffix) {
      retorno = this.checkSuffix(retorno);
      retorno = this.removeSuffix(retorno);
    }

    retorno = this.onlyNumber(retorno);

    if (retorno) {
      retorno = this.adjustDotPosition(retorno);

      retorno = this.removeCompleter(retorno, completer);

      retorno = this.checkNumberStart(retorno);
    }

    return retorno || (this.args.fixed ? '0' : '');
  }
};
