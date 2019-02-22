const assert = require('assert');
const Args = require('../src/args');

describe('Args', () => {
  let args;

  describe('Default', () => {
    beforeEach(() => {
      args = new Args();
    });

    it('afterFormat', () => {
      assert.equal(typeof args.afterFormat, 'function');
    });    

    it('allowNegative', () => {
      assert.equal(args.allowNegative, false);
    });    
    
    it('beforeFormat', () => {
      assert.equal(typeof args.beforeFormat, 'function');
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
      assert.equal(args.cursor, 'move');
    });
  });

  describe('Custom', () => {
    beforeEach(() => {
      args = new Args({
        afterFormat() { return 1; },
        prefix: 'R$',
        fixed: false,
        negativeSignAfter: true,
        decimalSeparator: '.',
        cursor: 'end'
      });
      
      args.allowNegative = true;
      args.beforeFormat = () => 1;
      args.suffix = '.';
      args.fractionDigits = '3';
      args.thousandsSeparator = ',';
    });
    
    it('afterFormat', () => {
      assert.equal(typeof args.afterFormat, 'function');
      assert.equal(args.afterFormat(), 1);
    });    

    it('allowNegative', () => {
      assert.equal(args.allowNegative, true);
    });    
    
    it('beforeFormat', () => {
      assert.equal(typeof args.beforeFormat, 'function');
      assert.equal(args.beforeFormat(), 1);
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
