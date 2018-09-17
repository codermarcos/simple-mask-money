const assert = require('assert');
const Args = require('../src/args');

describe('Args', () => {
  let args;

  describe('Default', () => {
    before(() => {
      args = new Args();
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
    before(() => {
      args = new Args({
        prefix: 'R$',
        fixed: false,
        decimalSeparator: '.',
        cursor: 'end'
      });

      args.suffix = '.';
      args.fractionDigits = '3';
      args.thousandsSeparator = ',';
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
