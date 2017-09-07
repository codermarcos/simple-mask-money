const lib = require('../lib/simple-mask-money.js');
const assert = require('assert');

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
    it('onlyNumber', () => {
      assert.equal(lib.SimpleMaskMoney.onlyNumber('@-,.1a0a'), '10');
    });

    it('addingCompleterFromStart', () => {
      assert.equal(lib.SimpleMaskMoney.addingCompleterFromStart('1'), '01');
    });
    it('removingCompleterFromStart', () => {
      assert.equal(lib.SimpleMaskMoney.removingCompleterFromStart('01'), '1');
    });


    it('addingPreffix', () => {
      assert.equal(lib.SimpleMaskMoney.addingPreffix('0,00'), '0,00');
    });
    it('removingPreffix', () => {
      assert.equal(lib.SimpleMaskMoney.removingPreffix('0,00'), '0,00');
    });


    it('addingDecimalSeparator', () => {
      assert.equal(lib.SimpleMaskMoney.addingDecimalSeparator('0'), '0');
      assert.equal(lib.SimpleMaskMoney.addingDecimalSeparator('00'), '0,00');
    });
    it('removingSeparators', () => {
      assert.equal(lib.SimpleMaskMoney.removingSeparators('00.000.000.000,00'), '0000000000000');
    });

    it('formatDecimal', () => {
      assert.equal(lib.SimpleMaskMoney.formatDecimal('1'), '0,01');
      assert.equal(lib.SimpleMaskMoney.formatDecimal('12345'), '123,45');
    });

    it('textToNumber', () => {
      assert.equal(lib.SimpleMaskMoney.textToNumber('a'), '0');
      assert.equal(lib.SimpleMaskMoney.textToNumber('a10a1'), '101');
      assert.equal(lib.SimpleMaskMoney.textToNumber('0010'), '10');
    });
  });
});