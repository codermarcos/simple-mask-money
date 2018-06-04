export default class {
  constructor(args) {
    this.decimalSeparator    = ',';
    this.fixed               = true;
    this.fractionDigits      = 2;
    this.prefix              = '';
    this.suffix              = '';
    this.thousandsSeparator  = '.';
    this.merge(args);
  }

  merge(args) {    
    if (!args || typeof args !== 'object') return;

    this.fixed               = typeof args.fixed === 'boolean' ? args.fixed : this.fixed;

    this.decimalSeparator    = args.decimalSeparator    || this.decimalSeparator;
    this.fractionDigits      = args.fractionDigits      || this.fractionDigits;
    this.prefix              = args.prefix              || args.preffix || this.prefix;
    this.suffix              = args.suffix              || this.suffix;
    this.thousandsSeparator  = args.thousandsSeparator  || this.thousandsSeparator;
  }
}
