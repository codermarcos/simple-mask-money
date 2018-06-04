import 'jsdom-global/register';
import index from '../src/index';
const assert = require('assert');

function write(input, value) {  
  const event = document.createEvent('HTMLEvents');
  event.initEvent('keypress', false, true);
  input.value = value;
  input.dispatchEvent(event);        
}

describe('Index', () => {
  describe('Default', () => {

    it('format', () => {
      assert.equal(index.format('a'), '0,00');
      assert.equal(index.format('0010'), '0,10');
      assert.equal(index.format('a10a1'), '1,01');
      assert.equal(index.format('2.500.02.510'), '2.500.025,10');
      assert.equal(index.format('a1a.5b0-0.0*25+10'), '1.500.025,10');
    });

    it('formatToNumber', () => {
      assert.equal(index.formatToNumber('a'), 0);
      assert.equal(index.formatToNumber('0010'), 0.1);
      assert.equal(index.formatToNumber('a10a1'), 1.01);
      assert.equal(index.formatToNumber('2.500.025,10'), 2500025.1);
      assert.equal(index.formatToNumber('a1a.5b0-0.0*25+10'), 1500025.1);
      assert.equal(index.formatToNumber('1.500.025,10'), 1500025.1);
    });    
    
    it('setMask', () => {
      let input = document.createElement('input');
      input = index.setMask(input);      
      
      write(input, 'a');
      assert.equal(input.value, '0,00');
      assert.equal(input.formatToNumber(), 0);      
      
      write(input, '0010');
      assert.equal(input.value, '0,10');
      assert.equal(input.formatToNumber(), 0.10);      
      
      write(input, 'a10a1');
      assert.equal(input.value, '1,01');
      assert.equal(input.formatToNumber(), 1.01);      

      write(input, '2.500.02.510');
      assert.equal(input.value, '2.500.025,10');
      assert.equal(input.formatToNumber(), 2500025.1);      

      write(input, 'a1a.5b0-0.0*25+10');
      assert.equal(input.value, '1.500.025,10');
      assert.equal(input.formatToNumber(), 1500025.1);

      write(input, '1.500.025,10');
      assert.equal(input.value, '1.500.025,10');
      assert.equal(input.formatToNumber(), 1500025.10);
    });
  });

  describe('Custom', () => {
    before(() => {
      index.args = {
        suffix: '.',
        prefix: 'R$',
        fixed: false,
        fractionDigits: 3,
        decimalSeparator: '.',
        thousandsSeparator: ','
      };
    });

    it('format', () => {
      assert.equal(index.format('a'), 'R$_.___.');
      assert.equal(index.format('0010'), 'R$_.001.');
      assert.equal(index.format('a10a1.'), 'R$_.101.');
      assert.equal(index.format('2.500.02.510.'), 'R$250,002.510.');
      assert.equal(index.format('a1a.5b0-0.0*25+10.'), 'R$150,002.510.');
    });

    it('formatToNumber', () => {
      assert.equal(index.formatToNumber('R$_.___.'), 0);
      assert.equal(index.formatToNumber('R$_.001.'), 0.001);
      assert.equal(index.formatToNumber('R$_.101.'), 0.101);
      assert.equal(index.formatToNumber('R$250,002.510.'), 250002.51);
      assert.equal(index.formatToNumber('R$150,002.510.'), 150002.51);
    }); 
    
    it('setMask', () => {
      let input = document.createElement('input');
      input = index.setMask(input);      
      
      write(input, 'a');
      assert.equal(input.value, 'R$_.___.');
      assert.equal(input.formatToNumber(), 0);      
      
      write(input, '0010');
      assert.equal(input.value, 'R$_.001.');
      assert.equal(input.formatToNumber(), 0.001);      
      
      write(input, 'a10a1');
      assert.equal(input.value, 'R$_._10.');
      assert.equal(input.formatToNumber(), 0.01);      

      write(input, '2.500.02.510');
      assert.equal(input.value, 'R$25,000.251.');
      assert.equal(input.formatToNumber(), 25000.251);      

      write(input, 'a1a.5b0-0.0*25+10');
      assert.equal(input.value, 'R$15,000.251.');
      assert.equal(input.formatToNumber(), 15000.251);

      write(input, '1.500.025,10');
      assert.equal(input.value, 'R$15,000.251.');
      assert.equal(input.formatToNumber(), 15000.251);
    });
  });
});
