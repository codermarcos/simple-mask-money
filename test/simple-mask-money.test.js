const lib = require('../lib/simple-mask-money.js');
const assert = require('assert');

let completer;
let separator;

describe('Default', () => {

  describe('Config', () => {
    it('Default prefix', () => {
      assert.equal(lib.SimpleMaskMoney.args.prefix, '');
    });

    it('Default suffix', () => {
      assert.equal(lib.SimpleMaskMoney.args.suffix, '');
    });

    it('Default fixed', () => {
      assert.equal(lib.SimpleMaskMoney.args.fixed, true);
    });

    it('Default fractionDigits', () => {
      assert.equal(lib.SimpleMaskMoney.args.fractionDigits, 2);
    });

    it('Default decimalSeparator', () => {
      assert.equal(lib.SimpleMaskMoney.args.decimalSeparator, ',');
    });

    it('Default thousandsSeparator', () => {
      assert.equal(lib.SimpleMaskMoney.args.thousandsSeparator, '.');
    });

    it('Default autoCompleteDecimal', () => {
      assert.equal(lib.SimpleMaskMoney.args.autoCompleteDecimal, false);
    });
  });

  describe('Return', () => {
    before(() => {
      completer = lib.SimpleMaskMoney.args.fixed ? '0' : '_';
      separator = lib.SimpleMaskMoney.args.decimalSeparator;
    });

    it('onlyNumber', () => {
      assert.equal(lib.SimpleMaskMoney.onlyNumber('@-,.1a0a'), '10');
    });

    it('addingAutoComplete', () => {
      assert.equal(lib.SimpleMaskMoney.addingAutoComplete('01,'), '01,00');
      assert.equal(lib.SimpleMaskMoney.addingAutoComplete('01,2,'), '01,2,00');
    });

    it('autoComplete', () => {
      assert.equal(lib.SimpleMaskMoney.autoComplete('01,'), '01,');
      assert.equal(lib.SimpleMaskMoney.autoComplete('01,2,'), '01,2,00');
    });

    it('addingCompleterFromStart', () => {
      assert.equal(lib.SimpleMaskMoney.addingCompleterFromStart('1', completer), '01');
    });

    it('removingCompleterFromStart', () => {
      assert.equal(lib.SimpleMaskMoney.removingCompleterFromStart('01', completer), '1');
    });

    it('addingCompleterFromEnd', () => {
      assert.equal(lib.SimpleMaskMoney.addingCompleterFromEnd('1', completer), '10');
    });

    it('removingCompleterFromEnd', () => {
      assert.equal(lib.SimpleMaskMoney.removingCompleterFromEnd('10', completer), '1');
    });

    it('addingPrefix', () => {
      assert.equal(lib.SimpleMaskMoney.addingPrefix('0,00'), '0,00');
    });

    it('removingPrefix', () => {
      assert.equal(lib.SimpleMaskMoney.removingPrefix('0,00'), '0,00');
    });

    it('addingDecimalSeparator', () => {
      assert.equal(lib.SimpleMaskMoney.addingDecimalSeparator('0', completer, separator), '0');
      assert.equal(lib.SimpleMaskMoney.addingDecimalSeparator('00', completer, separator), '0,00');
    });

    it('addingHundredsSeparator', () => {
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('0'), ',0');
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('000'), '0,00');
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('0000'), '00,00');
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('00000'), '000,00');
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('000000'), '0.000,00');
    });

    it('removeSeparator', () => {
      assert.equal(lib.SimpleMaskMoney.removeSeparator('00.000.000.000,00', lib.SimpleMaskMoney.args.thousandsSeparator), '00000000000,00');
      assert.equal(lib.SimpleMaskMoney.removeSeparator('00.000.000.000,00', lib.SimpleMaskMoney.args.decimalSeparator), '00.000.000.00000');
    });

    it('formatDecimal', () => {
      assert.equal(lib.SimpleMaskMoney.formatDecimal('1', completer, separator), '0,01');
      assert.equal(lib.SimpleMaskMoney.formatDecimal('12345', completer, separator), '123,45');
    });

    it('textToNumber', () => {
      assert.equal(lib.SimpleMaskMoney.textToNumber('a'), '0');
      assert.equal(lib.SimpleMaskMoney.textToNumber('a10a1'), '101');
      assert.equal(lib.SimpleMaskMoney.textToNumber('0010'), '10');
    });

    it('numberToText', () => {
      assert.equal(lib.SimpleMaskMoney.numberToText('0'), '0,00');
      assert.equal(lib.SimpleMaskMoney.numberToText('101'), '1,01');
      assert.equal(lib.SimpleMaskMoney.numberToText('0010'), '00,10');
    });

    it('format', () => {
      assert.equal(lib.SimpleMaskMoney.format('a'), '0,00');
      assert.equal(lib.SimpleMaskMoney.format('0010'), '0,10');
      assert.equal(lib.SimpleMaskMoney.format('a10a1'), '1,01');
      assert.equal(lib.SimpleMaskMoney.format('2.500.025,10'), '2.500.025,10');
      assert.equal(lib.SimpleMaskMoney.format('a1a.5b0-0.0*25+10'), '1.500.025,10');
    });

    it('formatToNumber', () => {
      assert.equal(lib.SimpleMaskMoney.formatToNumber('0010'), 0.10);
      assert.equal(lib.SimpleMaskMoney.formatToNumber('a10a1'), 1.01);
      assert.equal(lib.SimpleMaskMoney.formatToNumber('2.500.025,10'), 2500025.10);
      assert.equal(lib.SimpleMaskMoney.formatToNumber('a1a.5b0-0.0*25+10'), 1500025.10);
      assert.equal(lib.SimpleMaskMoney.formatToNumber('1.500.025,10'), 1500025.10);
    });
  });

});

describe('Custom', () => {
  describe('setGlobal', () => {

    it('prefix', () => {
      lib.SimpleMaskMoney.args = {
        prefix: 'R$',
        fixed: false,
        decimalSeparator: '.'
      };

      lib.SimpleMaskMoney.args.suffix = '.';
      lib.SimpleMaskMoney.args.fractionDigits = '3';
      lib.SimpleMaskMoney.args.thousandsSeparator = ',';
      lib.SimpleMaskMoney.args.autoCompleteDecimal = true;

      assert.equal(lib.SimpleMaskMoney.args.prefix, 'R$');
      assert.equal(lib.SimpleMaskMoney.args.suffix, '.');
      assert.equal(lib.SimpleMaskMoney.args.fixed, false);
      assert.equal(lib.SimpleMaskMoney.args.fractionDigits, 3);
      assert.equal(lib.SimpleMaskMoney.args.decimalSeparator, '.');
      assert.equal(lib.SimpleMaskMoney.args.thousandsSeparator, ',');
    });

  });


  describe('Return', () => {

    before(() => {
      completer = lib.SimpleMaskMoney.args.fixed ? '0' : '_';
      separator = lib.SimpleMaskMoney.args.decimalSeparator;
    });

    it('addingAutoComplete', () => {
      assert.equal(lib.SimpleMaskMoney.addingAutoComplete('01.'), '01.000');
      assert.equal(lib.SimpleMaskMoney.addingAutoComplete('01.2.'), '01.2.000');
    });

    it('autoComplete', () => {
      assert.equal(lib.SimpleMaskMoney.autoComplete('01.'), '01.');
      assert.equal(lib.SimpleMaskMoney.autoComplete('01.2.'), '01.2.000');
    });

    it('addingCompleterFromStart', () => {
      assert.equal(lib.SimpleMaskMoney.addingCompleterFromStart('1', completer), '__1');
    });

    it('removingCompleterFromStart', () => {
      assert.equal(lib.SimpleMaskMoney.removingCompleterFromStart('__1', completer), '1');
    });

    it('addingCompleterFromEnd', () => {
      assert.equal(lib.SimpleMaskMoney.addingCompleterFromEnd('1', completer), '1__');
    });

    it('removingCompleterFromEnd', () => {
      assert.equal(lib.SimpleMaskMoney.removingCompleterFromEnd('1_', completer), '1');
    });

    it('addingPrefix', () => {
      assert.equal(lib.SimpleMaskMoney.addingPrefix('_.___'), 'R$_.___');
    });

    it('removingPrefix', () => {
      assert.equal(lib.SimpleMaskMoney.removingPrefix('R$_.___'), '_.___');
    });

    it('addingDecimalSeparator', () => {
      assert.equal(lib.SimpleMaskMoney.addingDecimalSeparator('_', completer, separator), '_');
      assert.equal(lib.SimpleMaskMoney.addingDecimalSeparator('___', completer, separator), '_.___');
    });

    it('addingHundredsSeparator', () => {
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('0'), '.0');
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('000'), '.000');
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('0000'), '0.000');
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('00000'), '00.000');
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('000000'), '000.000');
      assert.equal(lib.SimpleMaskMoney.addingHundredsSeparator('0000000'), '0,000.000');
    });

    it('removeSeparator', () => {
      assert.equal(lib.SimpleMaskMoney.removeSeparator('_.___.___.___,___', lib.SimpleMaskMoney.args.thousandsSeparator), '_.___.___.______');
      assert.equal(lib.SimpleMaskMoney.removeSeparator('_.___.___.___,___', lib.SimpleMaskMoney.args.decimalSeparator), '__________,___');
    });

    it('formatDecimal', () => {
      assert.equal(lib.SimpleMaskMoney.formatDecimal('1', completer, separator), '_.__1');
      assert.equal(lib.SimpleMaskMoney.formatDecimal('12345', completer, separator), '12.345');
    });

    it('textToNumber', () => {
      assert.equal(lib.SimpleMaskMoney.textToNumber('a'), '');
      assert.equal(lib.SimpleMaskMoney.textToNumber('a10a1'), '10');
      assert.equal(lib.SimpleMaskMoney.textToNumber('a10a1.'), '101');
      assert.equal(lib.SimpleMaskMoney.textToNumber('__10.'), '10');
      assert.equal(lib.SimpleMaskMoney.textToNumber('_.__1..'), '1000');
    });

    it('numberToText', () => {
      assert.equal(lib.SimpleMaskMoney.numberToText('0'), 'R$_.__0.');
      assert.equal(lib.SimpleMaskMoney.numberToText('101'), 'R$_.101.');
      assert.equal(lib.SimpleMaskMoney.numberToText('0010'), 'R$0.010.');
    });

    it('format', () => {
      assert.equal(lib.SimpleMaskMoney.format('a'), 'R$_.___.');
      assert.equal(lib.SimpleMaskMoney.format('0010'), 'R$_.001.');
      assert.equal(lib.SimpleMaskMoney.format('a10a1.'), 'R$_.101.');
      assert.equal(lib.SimpleMaskMoney.format('2.500.02.510.'), 'R$250,002,510.000.');
      assert.equal(lib.SimpleMaskMoney.format('a1a.5b0-0.0*25+10.'), 'R$150,002,510.000.');
    });

    it('formatToNumber', () => {
      assert.equal(lib.SimpleMaskMoney.formatToNumber('R$_.___.'), 0);
      assert.equal(lib.SimpleMaskMoney.formatToNumber('R$_.001.'), 0.001);
      assert.equal(lib.SimpleMaskMoney.formatToNumber('R$_.101.'), 0.101);
      assert.equal(lib.SimpleMaskMoney.formatToNumber('R$250,002.510.'), 250002.510);
      assert.equal(lib.SimpleMaskMoney.formatToNumber('R$150,002.510.'), 150002.510);
    });

  });

});
