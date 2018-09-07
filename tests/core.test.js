const assert = require('assert');
const Core = require('../src/core');
const Args = require('../src/args');

describe('Core', () => {
  let core;
  let args;

  describe('Default', () => {

    before(() => {
      args = new Args();
      core = new Core(args);
    });

    it('onlyNumber', () => {
      assert.equal(core.onlyNumber('@-,.1a0a'), '10');
    });

    it('autoComplete', () => {
      assert.equal(core.autoComplete('01,'), '01,');
      assert.equal(core.autoComplete('01,2,'), '01,2,00');
    });

    it('addingCompleterFromStart', () => {
      assert.equal(core.addingCompleterFromStart('1', core.completer()), '01');
    });

    it('removingCompleterFromStart', () => {
      assert.equal(core.removingCompleterFromStart('01', core.completer()), '1');
    });

    it('removingCompleterFromEnd', () => {
      assert.equal(core.removingCompleterFromEnd('10', core.completer()), '1');
    });

    it('addingPrefix', () => {
      assert.equal(core.addingPrefix('0,00'), '0,00');
    });

    it('removingPrefix', () => {
      assert.equal(core.removingPrefix('0,00'), '0,00');
    });

    it('addingDecimalSeparator', () => {
      assert.equal(core.addingDecimalSeparator('0', core.completer(), args.decimalSeparator), '0');
      assert.equal(core.addingDecimalSeparator('00', core.completer(), args.decimalSeparator), '0,00');
    });

    it('addingHundredsSeparator', () => {
      assert.equal(core.addingHundredsSeparator('0'), ',0');
      assert.equal(core.addingHundredsSeparator('000'), '0,00');
      assert.equal(core.addingHundredsSeparator('0000'), '00,00');
      assert.equal(core.addingHundredsSeparator('00000'), '000,00');
      assert.equal(core.addingHundredsSeparator('000000'), '0.000,00');
    });

    it('removeSeparator', () => {
      assert.equal(core.removeSeparator('00.000.000.000,00', args.thousandsSeparator), '00000000000,00');
      assert.equal(core.removeSeparator('00.000.000.000,00', args.decimalSeparator), '00.000.000.00000');
    });

    it('formatDecimal', () => {
      assert.equal(core.formatDecimal('1', core.completer(), args.decimalSeparator), '0,01');
      assert.equal(core.formatDecimal('12345', core.completer(), args.decimalSeparator), '123,45');
    });

    it('textToNumber', () => {
      assert.equal(core.textToNumber('a'), '0');
      assert.equal(core.textToNumber('a10a1'), '101');
      assert.equal(core.textToNumber('0010'), '10');
    });

    it('numberToText', () => {
      assert.equal(core.numberToText('0'), '0,00');
      assert.equal(core.numberToText('101'), '1,01');
      assert.equal(core.numberToText('0010'), '00,10');
    });
  });

  describe('Custom', () => {

    before(() => {
      args = new Args({
        prefix: 'R$',
        fixed: false,
        decimalSeparator: '.'
      });

      args.suffix = '.';
      args.fractionDigits = '3';
      args.thousandsSeparator = ',';

      core = new Core(args);
    });

    it('autoComplete', () => {
      assert.equal(core.autoComplete('01.'), '01.');
      assert.equal(core.autoComplete('01.2.'), '01.2.000');
    });

    it('addingCompleterFromStart', () => {
      assert.equal(core.addingCompleterFromStart('1', core.completer()), '__1');
    });

    it('removingCompleterFromStart', () => {
      assert.equal(core.removingCompleterFromStart('__1', core.completer()), '1');
    });

    it('addingPrefix', () => {
      assert.equal(core.addingPrefix('_.___'), 'R$_.___');
    });

    it('removingPrefix', () => {
      assert.equal(core.removingPrefix('R$_.___'), '_.___');
    });

    it('addingDecimalSeparator', () => {
      assert.equal(core.addingDecimalSeparator('_', core.completer(), args.decimalSeparator), '_');
      assert.equal(core.addingDecimalSeparator('___', core.completer(), args.decimalSeparator), '_.___');
    });

    it('addingHundredsSeparator', () => {
      assert.equal(core.addingHundredsSeparator('0'), '.0');
      assert.equal(core.addingHundredsSeparator('000'), '.000');
      assert.equal(core.addingHundredsSeparator('0000'), '0.000');
      assert.equal(core.addingHundredsSeparator('00000'), '00.000');
      assert.equal(core.addingHundredsSeparator('000000'), '000.000');
      assert.equal(core.addingHundredsSeparator('0000000'), '0,000.000');
    });

    it('removeSeparator', () => {
      assert.equal(core.removeSeparator('_.___.___.___,___', args.thousandsSeparator), '_.___.___.______');
      assert.equal(core.removeSeparator('_.___.___.___,___', args.decimalSeparator), '__________,___');
    });

    it('formatDecimal', () => {
      assert.equal(core.formatDecimal('1', core.completer(), args.decimalSeparator), '_.__1');
      assert.equal(core.formatDecimal('12345', core.completer(), args.decimalSeparator), '12.345');
    });

    it('textToNumber', () => {
      assert.equal(core.textToNumber('a'), '');
      assert.equal(core.textToNumber('a10a1'), '10');
      assert.equal(core.textToNumber('a10a1.'), '101');
      assert.equal(core.textToNumber('__10.'), '10');
      assert.equal(core.textToNumber('_.__1..'), '1');
    });

    it('numberToText', () => {
      assert.equal(core.numberToText('0'), 'R$_.__0.');
      assert.equal(core.numberToText('101'), 'R$_.101.');
      assert.equal(core.numberToText('0010'), 'R$0.010.');
    });
  });
});
