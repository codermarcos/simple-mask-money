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
    let result = value.toString();

    result = result.replace('.', '');
    fractionDigits = result.length - this.args.fractionDigits;
    result = `${result.substring(0, fractionDigits)}.${result.substring(fractionDigits)}`;

    return result;
  }

  completer(size = 1) {
    return this.args.fixed ? ''.padEnd(size, '0') : ''.padEnd(size, '_');
  }

  checkNumberStart(value) {
    const result = value.toString();
    return result[0] === '.' ? `${this.args.fixed ? '0' : '_'}${result}` : result;
  }

  checkSuffix(value) {
    let result;
    const lastIndex = value.length - 1;
    const lastButOneIndex = lastIndex - 1;
    const currentLastSuffix = value.substring(lastIndex - this.args.suffix.length + 1, lastIndex + this.args.suffix.length);
    const currentLastButOneSuffix = value.substring(lastButOneIndex - this.args.suffix.length + 1, lastButOneIndex + this.args.suffix.length);

    switch (this.args.suffix) {
      case currentLastSuffix:
        result = value;
        break;
      case currentLastButOneSuffix:
        var start = value.substring(0, lastButOneIndex);
        result = `${start}${value.substring(value.length + this.args.suffix.length + 1, lastButOneIndex + this.args.suffix.length)}.`;
        break;
      default:
        result = `${value.substring(0, lastIndex)}.`;
        break;
    }

    return result;
  }

  emptyOrInvalid() {
    return `${this.completer()}${this.args.decimalSeparator}${this.completer(this.args.fractionDigits)}`;
  }

  isFloat(number) {
    return number % 1 !== 0;
  }

  mask(value) {
    const negative = this.args.allowNegative && value.indexOf('-') !== -1;
    let result = this.writingToNumber(value) || this.emptyOrInvalid();
    result = this.replaceSeparator(result.toString(), this.args.decimalSeparator, '.');

    if (!isNaN(result)) {
      result = this.replaceSeparator(result, '.');
      result = this.addCompleter(result || '', this.completer(), this.args.fractionDigits);
      result = this.args.fractionDigits >= result.length ? `${this.completer()}${result}` : result;
      result = this.addSeparators(result);
    }

    if (this.args.prefix) {
      result = this.addPrefix(result);
    }
    if (this.args.suffix) {
      result = this.addSuffix(result);
    }

    return `${!this.args.negativeSignAfter && negative ? '-' : ''}${result}${this.args.negativeSignAfter && negative ? '-' : ''}`;
  }

  numberToText(value) {
    let result = this.emptyOrInvalid();
    value = this.replaceSeparator(value.toString(), this.args.decimalSeparator, '.');

    if (!isNaN(parseFloat(value))) {
      if (this.isFloat(value)) {
        const number = value.split('.');
        let hundreds = number[0];
        let decimals = number[1];

        decimals = this.addCompleter(decimals || '', this.completer(), this.args.fractionDigits, false);

        result = `${hundreds}${decimals}`;
      } else {
        result = this.replaceSeparator(value, '.');
        result = this.addCompleter(result || '', this.completer(), this.args.fractionDigits);
        result = this.args.fractionDigits >= result.length ? `${this.completer()}${result}` : result;
      }

      result = this.addSeparators(result);
    }

    if (this.args.prefix) {
      result = this.addPrefix(result);
    }
    if (this.args.suffix) {
      result = this.addSuffix(result);
    }

    return result;
  }

  onlyNumber(value) {
    const hasDecimalSeparator = value.toString().indexOf(this.args.decimalSeparator);
    let putDecimalSeparator = false;
    let result = '';

    for (let i = value.length - 1; i >= 0; i--) {
      if (isFinite(value[i]) || (!this.args.fixed && value[i] === '_')) {
        result = value[i] + result;
      } else if (hasDecimalSeparator !== -1 && !putDecimalSeparator && value[i] === this.args.decimalSeparator) {
        result = value[i].replace(this.args.decimalSeparator, '.') + result;
        putDecimalSeparator = true;
      }
    }


    return result[0] === '.' ? `0${result}` : result;
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
    let result = value.toString();
    let completer = this.completer();

    if (this.args.prefix) {
      result = this.removePrefix(result);
    }

    if (this.args.suffix) {
      result = this.removeSuffix(result);
    }

    result = this.onlyNumber(result);

    if (result) {
      result = this.removeCompleter(result, completer);
      result = this.checkNumberStart(result);
    }

    return result || (this.args.fixed ? '0' : '');
  }

  writingToNumber(value) {
    let result = value.toString();
    let completer = this.completer();

    if (this.args.prefix) {
      result = this.removePrefix(result);
    }

    if (this.args.suffix) {
      result = this.checkSuffix(result);
      result = this.removeSuffix(result);
    }

    result = this.onlyNumber(result);

    if (result) {
      result = this.adjustDotPosition(result);

      result = this.removeCompleter(result, completer);

      result = this.checkNumberStart(result);
    }

    return result || (this.args.fixed ? '0' : '');
  }
};
