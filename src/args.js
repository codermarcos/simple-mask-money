module.exports = class Args {
  constructor(args) {
    this.afterFormat         = () => {}; 
    this.allowNegative       = false;  
    this.beforeFormat        = () => {};  
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

    this.fractionDigits = typeof args.fractionDigits === 'undefined' || isNaN(args.fractionDigits) ? this.fractionDigits : parseInt(args.fractionDigits);
    this.afterFormat    = typeof args.afterFormat    === 'function' ? args.afterFormat  : this.afterFormat;
    this.beforeFormat   = typeof args.beforeFormat   === 'function' ? args.beforeFormat : this.beforeFormat;

    this.fixed             = typeof args.fixed             === 'boolean' ? args.fixed             : this.fixed;
    this.allowNegative     = typeof args.allowNegative     === 'boolean' ? args.allowNegative     : this.allowNegative;    
    this.negativeSignAfter = typeof args.negativeSignAfter === 'boolean' ? args.negativeSignAfter : this.negativeSignAfter;

    this.decimalSeparator   = typeof args.decimalSeparator   === 'undefined' ? this.decimalSeparator   : args.decimalSeparator;
    this.prefix             = typeof args.prefix             === 'undefined' ? this.prefix             : args.prefix;
    this.suffix             = typeof args.suffix             === 'undefined' ? this.suffix             : args.suffix;
    this.thousandsSeparator = typeof args.thousandsSeparator === 'undefined' ? this.thousandsSeparator : args.thousandsSeparator;
    this.cursor             = typeof args.cursor             === 'undefined' ? this.cursor             : args.cursor;
  }
};
