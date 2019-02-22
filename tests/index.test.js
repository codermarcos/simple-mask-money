require('jsdom-global')();
const assert = require('assert');
const Index = require('../src/index');

let index;

function writeOnePerOne(input, value) {
  const event = document.createEvent('HTMLEvents');
  for (let i = 0; i < value.length; i++) {
    event.initEvent('input', false, true);
    input.value = input.value + value[i];
    input.dispatchEvent(event);
  }
}

function eraseOne(input) {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('input', false, true);
  input.value = input.value.substring(0, input.value.length - 1);
  input.dispatchEvent(event);
}

describe('Index', () => {
  describe('Default', () => {
    beforeEach(() => {
      index = Index;
    });

    it('writing', () => {
      let input = document.createElement('input');
      input = index.setMask(input);

      writeOnePerOne(input, 'a');
      assert.equal(input.value, '0,00');
      assert.equal(input.formatToNumber(), 0);

      writeOnePerOne(input, '1');
      assert.equal(input.value, '0,01');
      assert.equal(input.formatToNumber(), 0.01);

      writeOnePerOne(input, '58');
      assert.equal(input.value, '1,58');
      assert.equal(input.formatToNumber(), 1.58);
    });

    it('erasing', () => {
      let input = document.createElement('input');
      input = index.setMask(input);

      input.value = '0,58';
      eraseOne(input);
      assert.equal(input.value, '0,05');
      assert.equal(input.formatToNumber(), 0.05);

      input.value = '0,00';
      eraseOne(input);
      assert.equal(input.value, '0,00');
      assert.equal(input.formatToNumber(), 0);
    });

    it('formatToCurrency', () => {
      assert.equal(index.formatToCurrency('1'), '1,00');
      assert.equal(index.formatToCurrency('5,678'), '56,78');
      assert.equal(index.formatToCurrency('1,2'), '1,20');
      assert.equal(index.formatToCurrency('0,11'), '0,11');
      assert.equal(index.formatToCurrency('0,9'), '0,90');
      assert.equal(index.formatToCurrency('a'), '0,00');
      assert.equal(index.formatToCurrency('-10'), '10,00');
      assert.equal(index.formatToCurrency('0,02'), '0,02');
      assert.equal(index.formatToCurrency('0030'), '30,00');
      assert.equal(index.formatToCurrency('a10a1'), '101,00');
      assert.equal(index.formatToCurrency('2.500.02.510'), '250.002.510,00');
      assert.equal(index.formatToCurrency('a1a.5b0-0.0*25+10'), '150.002.510,00');
    });

    it('formatToMask', () => {
      assert.equal(index.formatToMask('0,01'), '0,01');
      assert.equal(index.formatToMask('5,678'), '56,78');
      assert.equal(index.formatToMask('1,2'), '0,12');
      assert.equal(index.formatToMask('0,11'), '0,11');
      assert.equal(index.formatToMask('0,9'), '0,09');
      assert.equal(index.formatToMask('a'), '0,00');
      assert.equal(index.formatToMask('-10'), '0,10');
      assert.equal(index.formatToMask('0,02'), '0,02');
      assert.equal(index.formatToMask('0030'), '0,30');
      assert.equal(index.formatToMask('a10a1'), '1,01');
      assert.equal(index.formatToMask('2.500.02.510'), '2.500.025,10');
      assert.equal(index.formatToMask('a1a.5b0-0.0*25+10'), '1.500.025,10');
    });

    it('formatToNumber', () => {
      assert.equal(index.formatToNumber('a'), 0);
      assert.equal(index.formatToNumber('-10'), 10);
      assert.equal(index.formatToNumber('0010'), 10);
      assert.equal(index.formatToNumber('a10a1'), 101);
      assert.equal(index.formatToNumber('2.500.025,10'), 2500025.1);
      assert.equal(index.formatToNumber('a3a.5b0-8.0*25+10'), 350802510);
      assert.equal(index.formatToNumber('1.500.025,10'), 1500025.1);
    });

    describe('setMask', () => {
      let input;

      beforeEach(() => {
        input = document.createElement('input');
      });
      
      it('change on set', () => {
        input = index.setMask(input);
        assert.equal(input.value, '0,00');
      });

      it('default args', () => {
        input = index.setMask(input);
        assert.equal(typeof input.maskArgs, 'object');
      });
      
      it('refresh on change args', () => {
        input = index.setMask(input);
        assert.equal(input.value, '0,00');
        input.maskArgs.prefix = 'R$';
        assert.equal(input.value, 'R$0,00');
      });
    });
  });

  describe('Custom', () => {
    beforeEach(() => {
      index = Index;
      index.args = {
        allowNegative: true,
        suffix: '.',
        prefix: 'R$',
        fixed: false,
        fractionDigits: 3,
        decimalSeparator: '.',
        thousandsSeparator: ','
      };
    });

    it('formatToMask', () => {
      assert.equal(index.formatToMask('a'), 'R$_.___.');
      assert.equal(index.formatToMask('010'), 'R$_._01.');
      assert.equal(index.formatToMask('0010'), 'R$_.001.');
      assert.equal(index.formatToMask('a10a1.'), 'R$_.101.');
      assert.equal(index.formatToMask('2.500.02.510.'), 'R$250,002.510.');
      assert.equal(index.formatToMask('a1a.5b0-0.0*25+10.'), '-R$150,002.510.');
      index.args.negativeSignAfter = true;
      assert.equal(index.formatToMask('0010-'), 'R$0.010.-');
    });

    it('formatToNumber', () => {
      assert.equal(index.formatToNumber('R$_.___.'), 0);
      assert.equal(index.formatToNumber('R$_.001.'), 0.001);
      assert.equal(index.formatToNumber('R$_.101.'), 0.101);
      assert.equal(index.formatToNumber('R$250,002.510.'), 250002.51);
      assert.equal(index.formatToNumber('-R$150,002.510.'), -150002.51);
      assert.equal(index.formatToNumber('R$150,002.510.-'), -150002.51);
    });

    describe('setMask', () => {
      let input;

      beforeEach(() => {
        input = document.createElement('input');
      });
      
      it('change on set', () => {
        input = index.setMask(input);
        assert.equal(input.value, 'R$_.___.');
      });

      it('default args', () => {
        input = index.setMask(input);
        assert.equal(typeof input.maskArgs, 'object');
      });
      
      it('refresh on change args', () => {
        input = index.setMask(input);
        assert.equal(input.value, 'R$_.___.');
        writeOnePerOne(input, '0');
        assert.equal(input.value, 'R$_.__0.');
        input.maskArgs.prefix = '';
        assert.equal(input.value, '_.__0.');
        eraseOne(input);
        assert.equal(input.value, '_.___.');
      });
    });
  });
});
