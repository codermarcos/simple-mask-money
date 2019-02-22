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
    
    it('addCompleter', () => {
      assert.equal(core.addCompleter('1', core.completer(), 1), '1');
      assert.equal(core.addCompleter('2', core.completer(), 2), '02');
      assert.equal(core.addCompleter('3', core.completer(), 3), '003');
      assert.equal(core.addCompleter('4', core.completer(), 3, false), '400');
    });

    it('addPrefix', () => {
      assert.equal(core.addPrefix('0,00'), '0,00');
    });
    
    it('addSeparators', () => {
      assert.equal(core.addSeparators('0'), ',0');
      assert.equal(core.addSeparators('000'), '0,00');
      assert.equal(core.addSeparators('0000'), '00,00');
      assert.equal(core.addSeparators('00000'), '000,00');
      assert.equal(core.addSeparators('000000'), '0.000,00');
    });    

    it('adjustDotPosition', () => {
      assert.equal(core.adjustDotPosition('.0'), '.0');
      assert.equal(core.adjustDotPosition('1.0'), '.10');
      assert.equal(core.adjustDotPosition('10.'), '.10');
      assert.equal(core.adjustDotPosition('10.0'), '1.00');
    });

    it('checkNumberStart', () => {
      assert.equal(core.checkNumberStart('.0', ','), '.0');
      assert.equal(core.checkNumberStart('.0', '.'), '0.0');
      assert.equal(core.checkNumberStart('1.0', '.'), '1.0');
      assert.equal(core.checkNumberStart('.10', '.'), '0.10');
    });

    it('isFloat', () => {
      assert.equal(core.isFloat(1.20), true);
      assert.equal(core.isFloat('3.40'), true);
    });

    it('numberToText', () => {
      assert.equal(core.numberToText('1,2'), '1,20');
      assert.equal(core.numberToText('0,11'), '0,11');
      assert.equal(core.numberToText('0,9'), '0,90');
      assert.equal(core.numberToText('0'), '0,00');
      assert.equal(core.numberToText('101'), '101,00');
      assert.equal(core.numberToText('0010'), '10,00');
    });

    it('onlyNumber', () => {
      assert.equal(core.onlyNumber('3.40'), '340');
      assert.equal(core.onlyNumber(',23'), '0.23');
      assert.equal(core.onlyNumber('a'), '');
      assert.equal(core.onlyNumber('@-,.1a0a'), '0.10');
      assert.equal(core.onlyNumber('0,12'), '0.12');
      assert.equal(core.onlyNumber('56,0'), '56.0');
      assert.equal(core.onlyNumber('7,8,0'), '78.0');
    });

    it('removeCompleter', () => {
      assert.equal(core.removeCompleter('1', core.completer()), '1');
      assert.equal(core.removeCompleter('02', core.completer()), '2');
      assert.equal(core.removeCompleter('300', core.completer()), '300');
      assert.equal(core.removeCompleter('004', core.completer(), false), '004');
    });

    it('removePrefix', () => {
      assert.equal(core.removePrefix('0,00'), '0,00');
    });

    it('replaceSeparator', () => {
      assert.equal(core.replaceSeparator('00.000.000.000,00', args.thousandsSeparator), '00000000000,00');
      assert.equal(core.replaceSeparator('00.000.000.000,00', args.decimalSeparator), '00.000.000.00000');
      assert.equal(core.replaceSeparator('00.000.000.000,00', args.decimalSeparator, '.'), '00.000.000.000.00');
      assert.equal(core.replaceSeparator('00.000.000.000,00', args.thousandsSeparator, ','), '00,000,000,000,00');
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

    it('writingToNumber', () => {
      assert.equal(core.writingToNumber('a'), '0');
      assert.equal(core.writingToNumber('a10a1'), '1.01');
      assert.equal(core.writingToNumber('0010'), '0.10');
      assert.equal(core.writingToNumber('1.2'), '0.12');
      assert.equal(core.writingToNumber('1,20'), '1.20');
      assert.equal(core.writingToNumber('0,11'), '0.11');
      assert.equal(core.writingToNumber('0,9'), '0.09');
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

    it('addCompleter', () => {
      assert.equal(core.addCompleter('1', core.completer(), 3), '__1');
    });
    
    it('addPrefix', () => {
      assert.equal(core.addPrefix('_.___'), 'R$_.___');
    });

    it('adjustDotPosition', () => {
      assert.equal(core.adjustDotPosition('.0'), '.0');
      assert.equal(core.adjustDotPosition('1.0'), '.10');
      assert.equal(core.adjustDotPosition('10.'), '.10');
      assert.equal(core.adjustDotPosition('10.0'), '.100');
    });

    it('addSeparator', () => {
      assert.equal(core.addSeparators('0'), '.0');
      assert.equal(core.addSeparators('000'), '.000');
      assert.equal(core.addSeparators('0000'), '0.000');
      assert.equal(core.addSeparators('00000'), '00.000');
      assert.equal(core.addSeparators('000000'), '000.000');
      assert.equal(core.addSeparators('0000000'), '0,000.000');
    });

    it('checkNumberStart', () => {
      assert.equal(core.checkNumberStart('.0', ','), '.0');
      assert.equal(core.checkNumberStart('.0', '.'), '_.0');
      assert.equal(core.checkNumberStart('1.0', '.'), '1.0');
      assert.equal(core.checkNumberStart('.10', '.'), '_.10');
    });

    it('isFloat', () => {
      assert.equal(core.isFloat(1.20), true);
      assert.equal(core.isFloat('1.20'), true);
    });

    it('numberToText', () => {
      assert.equal(core.numberToText('0'), 'R$0.___.');
      assert.equal(core.numberToText('101'), 'R$101.___.');
      assert.equal(core.numberToText('0010'), 'R$0,010.___.');
      assert.equal(core.numberToText('1.2'), 'R$1.2__.');
      assert.equal(core.numberToText('0.11'), 'R$0.11_.');
      assert.equal(core.numberToText('0.988'), 'R$0.988.');
      assert.equal(core.numberToText('a'), 'R$_.___.');
      assert.equal(core.numberToText('101'), 'R$101.___.');
    });

    it('onlyNumber', () => {
      assert.equal(core.onlyNumber('@-,.1a0a'), '0.10');
      assert.equal(core.onlyNumber('0,12'), '012');
      assert.equal(core.onlyNumber('1.20'), '1.20');
      assert.equal(core.onlyNumber('12,0'), '120');
      assert.equal(core.onlyNumber('1,2,0'), '120');
    });

    it('removeCompleter', () => {
      assert.equal(core.removeCompleter('__1', core.completer()), '1');
    });

    it('removePrefix', () => {
      assert.equal(core.removePrefix('R$_.___'), '_.___');
    });

    it('replaceSeparator', () => {
      assert.equal(core.replaceSeparator('_.___.___.___,___', args.thousandsSeparator), '_.___.___.______');
      assert.equal(core.replaceSeparator('_.___.___.___,___', args.decimalSeparator), '__________,___');
      assert.equal(core.replaceSeparator('_.___.___.___,___', args.decimalSeparator, ','), '_,___,___,___,___');
      assert.equal(core.replaceSeparator('_.___.___.___,___', args.thousandsSeparator, '.'), '_.___.___.___.___');
    });

    it('textToNumber', () => {
      assert.equal(core.textToNumber('a'), '');
      assert.equal(core.textToNumber('a10a1'), '101');
      assert.equal(core.textToNumber('a10a1.'), '101');
      assert.equal(core.textToNumber('__10.'), '10');
      assert.equal(core.textToNumber('_.__1.'), '_.__1');
      assert.equal(core.textToNumber('_.__1.0.'), '1.0');
      assert.equal(core.textToNumber('1.20'), '1.20');
      assert.equal(core.textToNumber('1.2'), '1.2');
      assert.equal(core.textToNumber('0.11'), '0.11');
      assert.equal(core.textToNumber('0.9'), '0.9');
    });

    it('writingToNumber', () => {
      assert.equal(core.writingToNumber('a'), '');
      assert.equal(core.writingToNumber('a10a1.'), '_.101');
      assert.equal(core.writingToNumber('__10.'), '_._10');
      assert.equal(core.writingToNumber('_.__1.'), '_.__1');
      assert.equal(core.writingToNumber('_.__1.0.'), '_._10');
      assert.equal(core.writingToNumber('1.20'), '_.12');
      assert.equal(core.writingToNumber('1.2'), '_.12');
      assert.equal(core.writingToNumber('0.11'), '_.01');
      assert.equal(core.writingToNumber('0.9'), '_.09');
    });
  });
});
