const assert = require('assert');
const Args = require('../src/args');

describe('Args', () => {
  let args;

  describe('Default', () => {
    beforeEach(() => {
      args = new Args();
    });

    it('allowNegative', () => {
      assert.equal(args.allowNegative, false);
    });    
    
    it('negativeSignAfter', () => {
      assert.equal(args.negativeSignAfter, false);
    });

    it('prefix', () => {
      assert.equal(args.prefix, '');
    });

    it('suffix', () => {
      assert.equal(args.suffix, '');
    });

    it('fixed', () => {
      assert.equal(args.fixed, true);
    });

    it('fractionDigits', () => {
      assert.equal(args.fractionDigits, 2);
    });

    it('decimalSeparator', () => {
      assert.equal(args.decimalSeparator, ',');
    });

    it('thousandsSeparator', () => {
      assert.equal(args.thousandsSeparator, '.');
    });

    it('cursor', () => {
      assert.equal(args.cursor, 'original');
    });
  });

  describe('Custom', () => {
    beforeEach(() => {
      args = new Args({
        prefix: 'R$',
        fixed: false,
        negativeSignAfter: true,
        decimalSeparator: '.',
        cursor: 'end'
      });
      
      args.allowNegative = true;
      args.suffix = '.';
      args.fractionDigits = '3';
      args.thousandsSeparator = ',';
    });
    
    it('allowNegative', () => {
      assert.equal(args.allowNegative, true);
    });    
    
    it('negativeSignAfter', () => {
      assert.equal(args.negativeSignAfter, true);
    });

    it('prefix', () => {
      assert.equal(args.prefix, 'R$');
    });

    it('suffix', () => {
      assert.equal(args.suffix, '.');
    });

    it('fixed', () => {
      assert.equal(args.fixed, false);
    });

    it('fractionDigits', () => {
      assert.equal(args.fractionDigits, 3);
    });

    it('decimalSeparator', () => {
      assert.equal(args.decimalSeparator, '.');
    });

    it('thousandsSeparator', () => {
      assert.equal(args.thousandsSeparator, ',');
    });

    it('cursor', () => {
      assert.equal(args.cursor, 'end');
    });
  });
});
