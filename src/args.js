module.exports = class Args {
  constructor(args) {
    this.allowNegative       = false;    
    this.negativeSignAfter   = false;
    this.decimalSeparator    = ',';
    this.fixed               = true;
    this.fractionDigits      = 2;
    this.prefix              = '';
    this.suffix              = '';
    this.thousandsSeparator  = '.';
    this.cursor              = 'move';

    this.merge(args);
  }

  merge(args) {
    if (!args || typeof args !== 'object') return;

    this.fixed               = typeof args.fixed             === 'boolean' ? args.fixed             : this.fixed;
    this.allowNegative       = typeof args.allowNegative     === 'boolean' ? args.allowNegative     : this.allowNegative;    
    this.negativeSignAfter   = typeof args.negativeSignAfter === 'boolean' ? args.negativeSignAfter : this.negativeSignAfter;

    this.decimalSeparator    = typeof args.decimalSeparator   === 'undefined' ? this.decimalSeparator   : args.decimalSeparator;
    this.fractionDigits      = typeof args.fractionDigits     === 'undefined' ? this.fractionDigits     : args.fractionDigits;
    this.prefix              = typeof args.prefix             === 'undefined' ? this.prefix             : args.prefix;
    this.suffix              = typeof args.suffix             === 'undefined' ? this.suffix             : args.suffix;
    this.thousandsSeparator  = typeof args.thousandsSeparator === 'undefined' ? this.thousandsSeparator : args.thousandsSeparator;
    this.cursor              = typeof args.cursor             === 'undefined' ? this.cursor             : args.cursor;
  }
};
