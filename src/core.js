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
    let hasDecimalSeparator = false;
    let retorno = '';

    for (let i = 0; i < value.length; i++) {
      if (isFinite(value[i])) retorno += value[i];
      if (!hasDecimalSeparator && value[i] === this.args.decimalSeparator) {
        retorno += value[i].replace(this.args.decimalSeparator, '.');
        hasDecimalSeparator = true;
      }
    }

    return retorno;
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

  addingCompleterFromStart(value, completer) {
    while (value.length < this.args.fractionDigits) {
      value = `${completer}${value}`;
    }
    return value;
  }

  addingCompleterFromEnd(value, completer) {
    while (value.length < this.args.fractionDigits) {
      value = `${value}${completer}`;
    }
    return value;
  }

  removingCompleterFromStart(value, completer) {
    while (value[0] === completer) {
      value = value.replace(completer, '');
    }
    return value;
  }

  removingCompleterFromEnd(value, completer) {
    while (value[value.length - 1] === completer) {
      value = value.substring(0, value.length - 1);
    }
    return value;
  }

  addingAutoComplete(value) {
    const n = `${value}${this.addingCompleterFromEnd('', '0')}`;
    return n;
  }

  autoComplete(value) {
    const regexp = new RegExp(`\\${this.args.decimalSeparator}`, 'g');
    const array = value.match(regexp) || [];
    if (array.length > 1) {
      value = this.addingAutoComplete(value);
    }
    return value;
  }

  addingDecimalSeparator(value, completer, separator) {
    let length = value.length - this.args.fractionDigits;

    let regexpFraction;
    let decimals = '$1';
    let dezenas = completer;
    let character = isFinite(completer) ? 'd' : 'w';

    regexpFraction = `${this.isFloat(value) ? '.' : ''}(\\${character}{${this.args.fractionDigits}})`;

    if (length > 0) {
      regexpFraction = `(\\${character}{${length}})${regexpFraction}`;
      dezenas = decimals;
      decimals = '$2';
    }
    
    console.log(value.replace(
      new RegExp(regexpFraction),
      `${dezenas}${separator}${decimals}`
    ));

    return value.replace(
      new RegExp(regexpFraction),
      `${dezenas}${separator}${decimals}`
    );
  }

  addingHundredsSeparator(value) {
    let size = value.length - this.args.fractionDigits;
    let hundreds = Math.ceil(size / 3);
    let regexpHundreds = this.isFloat(value) ? '.(\\d)' : '(\\d)';

    let replacement = `${this.args.decimalSeparator}$${hundreds + 1}`;

    for (let i = hundreds; i !== 0; i--) {
      if (size >= 3) {
        regexpHundreds = `(\\d{3})${regexpHundreds}`;
        size -= 3;
      } else {
        regexpHundreds = `(\\d{${size}})${regexpHundreds}`;
      }

      if (i > 1) {
        replacement = `${this.args.thousandsSeparator}$${i}${replacement}`;
      } else {
        replacement = `$${i}${replacement}`;
      }
    }

    return value.replace(new RegExp(regexpHundreds), replacement);
  }

  removeSeparator(value, separator) {
    return value.replace(new RegExp(`\\${separator}`, 'g'), '');
  }

  formatDecimal(value, completer, separator) {
    value = this.addingCompleterFromStart(value, completer);
    value = this.addingDecimalSeparator(value, completer, separator);
    return value;
  }

  textToNumber(input) {
    let retorno = input.toString();
    let completer = this.completer();
    
    if (this.args.prefix) {
      retorno = this.removingPrefix(retorno);
    }
    
    if (this.args.suffix) {
      retorno = this.removingSuffix(retorno);
    }
    
    retorno = this.onlyNumber(retorno);

    if (retorno.indexOf('.') === -1) {
      retorno = this.removingCompleterFromStart(
        retorno,
        completer
      );
    }

    return retorno || (this.args.fixed ? '0' : '');
  }

  numberToText(input) {
    let retorno = this.emptyOrInvalid();

    if (!isNaN(parseFloat(input))) {
      if (input.length - 1 <= this.args.fractionDigits) {
        retorno = this.formatDecimal(
          input,
          this.completer(),
          this.args.decimalSeparator
        );
      } else {
        retorno = this.addingHundredsSeparator(input);
      }
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
