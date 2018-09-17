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

    // After adding number, move the
    // cursor to start|end|move.
    this.cursor              = 'move';

    this.merge(args);
  }

  merge(args) {
    if (!args || typeof args !== 'object') return;

    this.fixed               = typeof args.fixed === 'boolean' ? args.fixed : this.fixed;
    this.allowNegative       = typeof args.allowNegative === 'boolean' ? args.allowNegative : this.allowNegative;    
    this.negativeSignAfter   = typeof args.negativeSignAfter === 'boolean' ? args.negativeSignAfter : this.negativeSignAfter;

    this.decimalSeparator    = args.decimalSeparator    || this.decimalSeparator;
    this.fractionDigits      = args.fractionDigits      || this.fractionDigits;
    this.prefix              = args.prefix              || args.preffix || this.prefix;
    this.suffix              = args.suffix              || this.suffix;
    this.thousandsSeparator  = args.thousandsSeparator  || this.thousandsSeparator;
    this.cursor              = args.cursor              || this.cursor;
  }
};
