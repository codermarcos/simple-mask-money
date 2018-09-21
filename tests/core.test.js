const assert = require('assert');
const Core = require('../src/core');
const Args = require('../src/args');

describe('Core', () => {
  let core;
  let args;

  describe('Default', () => {

    beforeEach(() => {
      args = new Args();
      core = new Core(args);
    });

    it('isFloat', () => {
      assert.equal(core.isFloat(1.20), true);
      assert.equal(core.isFloat('3.40'), true);
    });

    it('onlyNumber', () => {
      assert.equal(core.onlyNumber('@-,.1a0a'), '.10');
      assert.equal(core.onlyNumber('0,12'), '0.12');
      assert.equal(core.onlyNumber('3.40'), '340');
      assert.equal(core.onlyNumber('56,0'), '56.0');
      assert.equal(core.onlyNumber('7,8,0'), '7.80');
    });

    it('addingCompleter', () => {
      assert.equal(core.addingCompleter('1', core.completer(), 1), '1');
      assert.equal(core.addingCompleter('2', core.completer(), 2), '02');
      assert.equal(core.addingCompleter('3', core.completer(), 3), '003');
      assert.equal(core.addingCompleter('4', core.completer(), 3, false), '400');
    });

    it('removingCompleter', () => {
      assert.equal(core.removingCompleter('1', core.completer()), '1');
      assert.equal(core.removingCompleter('02', core.completer()), '2');
      assert.equal(core.removingCompleter('300', core.completer()), '300');
      assert.equal(core.removingCompleter('004', core.completer(), false), '004');
    });

    it('addingPrefix', () => {
      assert.equal(core.addingPrefix('0,00'), '0,00');
    });

    it('removingPrefix', () => {
      assert.equal(core.removingPrefix('0,00'), '0,00');
    });

    it('addingSeparators', () => {
      assert.equal(core.addingSeparators('0'), ',0');
      assert.equal(core.addingSeparators('000'), '0,00');
      assert.equal(core.addingSeparators('0000'), '00,00');
      assert.equal(core.addingSeparators('00000'), '000,00');
      assert.equal(core.addingSeparators('000000'), '0.000,00');
    });

    it('removeSeparator', () => {
      assert.equal(core.removeSeparator('00.000.000.000,00', args.thousandsSeparator), '00000000000,00');
      assert.equal(core.removeSeparator('00.000.000.000,00', args.decimalSeparator), '00.000.000.00000');
    });

    it('textToNumber', () => {
      assert.equal(core.textToNumber('a'), '0');
      assert.equal(core.textToNumber('a10a1'), '101');
      assert.equal(core.textToNumber('0010'), '10');      
      assert.equal(core.textToNumber('1.2'), '12');
      assert.equal(core.textToNumber('1,20'), '1.20');
      assert.equal(core.textToNumber('0,11'), '0.11');
      assert.equal(core.textToNumber('0,9'), '0.9');
    });

    it('numberToText', () => {      
      assert.equal(core.numberToText('1,2'), '1,20');
      assert.equal(core.numberToText('0,11'), '0,11');
      assert.equal(core.numberToText('0,9'), '0,90');
      assert.equal(core.numberToText('0'), '0,00');
      assert.equal(core.numberToText('101'), '1,01');
      assert.equal(core.numberToText('0010'), '00,10');
    });
  });

  describe('Custom', () => {

    beforeEach(() => {
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
    
    it('isFloat', () => {
      assert.equal(core.isFloat(1.20), true);
      assert.equal(core.isFloat('1.20'), true);
    });
    
    it('onlyNumber', () => {
      assert.equal(core.onlyNumber('@-,.1a0a'), '.10');
      assert.equal(core.onlyNumber('0,12'), '012');
      assert.equal(core.onlyNumber('1.20'), '1.20');
      assert.equal(core.onlyNumber('12,0'), '120');
      assert.equal(core.onlyNumber('1,2,0'), '120');
    });

    it('addingCompleter', () => {
      assert.equal(core.addingCompleter('1', core.completer(), 3), '__1');
    });

    it('removingCompleter', () => {
      assert.equal(core.removingCompleter('__1', core.completer()), '1');
    });


    it('addingPrefix', () => {
      assert.equal(core.addingPrefix('_.___'), 'R$_.___');
    });

    it('removingPrefix', () => {
      assert.equal(core.removingPrefix('R$_.___'), '_.___');
    });

    it('addingSeparator', () => {
      assert.equal(core.addingSeparators('0'), '.0');
      assert.equal(core.addingSeparators('000'), '.000');
      assert.equal(core.addingSeparators('0000'), '0.000');
      assert.equal(core.addingSeparators('00000'), '00.000');
      assert.equal(core.addingSeparators('000000'), '000.000');
      assert.equal(core.addingSeparators('0000000'), '0,000.000');
    });

    it('removeSeparator', () => {
      assert.equal(core.removeSeparator('_.___.___.___,___', args.thousandsSeparator), '_.___.___.______');
      assert.equal(core.removeSeparator('_.___.___.___,___', args.decimalSeparator), '__________,___');
    });

    it('textToNumber', () => {
      assert.equal(core.textToNumber('a'), '');
      assert.equal(core.textToNumber('a10a1'), '101');
      assert.equal(core.textToNumber('a10a1.'), '101');
      assert.equal(core.textToNumber('__10.'), '10');
      assert.equal(core.textToNumber('_.__1.'), '.1');
      assert.equal(core.textToNumber('_.__1.0.'), '.10'); 
      assert.equal(core.textToNumber('1.20'), '1.20');       
      assert.equal(core.textToNumber('1.2'), '1.2');
      assert.equal(core.textToNumber('0.11'), '0.11');
      assert.equal(core.textToNumber('0.9'), '0.9');
    });

    it.only('numberToText', () => {
      assert.equal(core.numberToText('0'), 'R$_.__0.');
      assert.equal(core.numberToText('101'), 'R$_.101.');
      assert.equal(core.numberToText('0010'), 'R$0.010.');      
      assert.equal(core.numberToText('1.2'), 'R$1.2__.');
      assert.equal(core.numberToText('0.11'), 'R$0.11_.');
      assert.equal(core.numberToText('0.988'), 'R$0.988.');
      assert.equal(core.numberToText('a'), 'R$_.___.');
      assert.equal(core.numberToText('a10a1'), '1,01');
    });
  });
});
