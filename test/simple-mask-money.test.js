const lib = require('../lib/simple-mask-money.js');
const assert = require('assert');

let completer;
let separator;

describe('Default', () => {
    describe('Config', () => {
        it('preffix', () => {
            assert.equal(lib.SimpleMaskMoney.args.preffix, '');
        });
        it('suffix', () => {
            assert.equal(lib.SimpleMaskMoney.args.suffix, '');
        });
        it('fixed', () => {
            assert.equal(lib.SimpleMaskMoney.args.fixed, true);
        });
        it('fractionDigits', () => {
            assert.equal(lib.SimpleMaskMoney.args.fractionDigits, 2);
        });
        it('decimalSeparator', () => {
            assert.equal(lib.SimpleMaskMoney.args.decimalSeparator, ',');
        });
        it('thousandsSeparator', () => {
            assert.equal(lib.SimpleMaskMoney.args.thousandsSeparator, '.');
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

        it('addingCompleterFromStart', () => {
            assert.equal(lib.SimpleMaskMoney.addingCompleterFromStart('1', completer), '01');
        });
        it('removingCompleterFromStart', () => {
            assert.equal(lib.SimpleMaskMoney.removingCompleterFromStart('01', completer), '1');
        });

        it('addingPreffix', () => {
            assert.equal(lib.SimpleMaskMoney.addingPreffix('0,00'), '0,00');
        });
        it('removingPreffix', () => {
            assert.equal(lib.SimpleMaskMoney.removingPreffix('0,00'), '0,00');
        });

        it('addingDecimalSeparator', () => {
            assert.equal(lib.SimpleMaskMoney.addingDecimalSeparator('0', completer, separator), '0');
            assert.equal(lib.SimpleMaskMoney.addingDecimalSeparator('00', completer, separator), '0,00');
        });
        it('removingSeparators', () => {
            assert.equal(lib.SimpleMaskMoney.removingSeparators('00.000.000.000,00'), '0000000000000');
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

        it('toCents', () => {
            assert.equal(lib.SimpleMaskMoney.toCents('0.10'), 10);
            assert.equal(lib.SimpleMaskMoney.toCents('1.01'), 101);
            assert.equal(lib.SimpleMaskMoney.toCents('2500025.10'), 250002510);
            assert.equal(lib.SimpleMaskMoney.toCents('1500025.10'), 150002510);
        });
    });

});

describe('Custom', () => {
    describe('setGlobal', () => {
        it('preffix', () => {
            lib.SimpleMaskMoney.args = {
                preffix: 'R$',
                fixed: false,
                decimalSeparator: '.'
            };

            lib.SimpleMaskMoney.args.suffix = '.';
            lib.SimpleMaskMoney.args.fractionDigits = '3';
            lib.SimpleMaskMoney.args.thousandsSeparator = ',';

            assert.equal(lib.SimpleMaskMoney.args.preffix, 'R$');
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

        it('addingCompleterFromStart', () => {
            assert.equal(lib.SimpleMaskMoney.addingCompleterFromStart('1', completer), '__1');
        });
        it('removingCompleterFromStart', () => {
            assert.equal(lib.SimpleMaskMoney.removingCompleterFromStart('__1', completer), '1');
        });

        it('addingPreffix', () => {
            assert.equal(lib.SimpleMaskMoney.addingPreffix('_.___'), 'R$_.___');
        });
        it('removingPreffix', () => {
            assert.equal(lib.SimpleMaskMoney.removingPreffix('R$_.___'), '_.___');
        });

        it('addingDecimalSeparator', () => {
            assert.equal(lib.SimpleMaskMoney.addingDecimalSeparator('_', completer, separator), '_');
            assert.equal(lib.SimpleMaskMoney.addingDecimalSeparator('___', completer, separator), '_.___');
        });
        it('removingSeparators', () => {
            assert.equal(lib.SimpleMaskMoney.removingSeparators('__.___.___.___,__'), '_____________');
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
            assert.equal(lib.SimpleMaskMoney.format('2.500.02.510.'), 'R$250,002.510.');
            assert.equal(lib.SimpleMaskMoney.format('a1a.5b0-0.0*25+10.'), 'R$150,002.510.');
        });

        it('formatToNumber', () => {
            assert.equal(lib.SimpleMaskMoney.formatToNumber('R$_.___.'), 0);
            assert.equal(lib.SimpleMaskMoney.formatToNumber('R$_.001.'), 0.001);
            assert.equal(lib.SimpleMaskMoney.formatToNumber('R$_.101.'), 0.101);
            assert.equal(lib.SimpleMaskMoney.formatToNumber('R$250,002.510.'), 250002.510);
            assert.equal(lib.SimpleMaskMoney.formatToNumber('R$150,002.510.'), 150002.510);
        });

        it('toCents', () => {
            assert.equal(lib.SimpleMaskMoney.toCents('0.001'), 0);
            assert.equal(lib.SimpleMaskMoney.toCents('0.101'), 10);
            assert.equal(lib.SimpleMaskMoney.toCents('250002.510'), 25000251);
            assert.equal(lib.SimpleMaskMoney.toCents('150002.510'), 15000251);
        });
    });

});