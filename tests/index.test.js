require('jsdom-global')();
const assert = require('assert');
const Index = require('../src/index');

let index;

function writeAll(input, value) {  
  const event = document.createEvent('HTMLEvents');
  event.initEvent('input', false, true);
  input.value = value;
  input.dispatchEvent(event);        
}

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
      index = new Index();
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

      input.value = '1,23';
      writeAll(input, ',23');
      assert.equal(input.value, '0,23');
      assert.equal(input.formatToNumber(), 0.23); 
    });

    it('format', () => {
      assert.equal(index.format('0,01'), '0,01');
      assert.equal(index.format('5,678'), '56,78');
      assert.equal(index.format('1,2'), '1,20');
      assert.equal(index.format('0,11'), '0,11');
      assert.equal(index.format('0,9'), '0,90');
      assert.equal(index.format('a'), '0,00');
      assert.equal(index.format('-10'), '0,10');
      assert.equal(index.format('0,02'), '0,02');
      assert.equal(index.format('0030'), '0,30');
      assert.equal(index.format('a10a1'), '1,01');
      assert.equal(index.format('2.500.02.510'), '2.500.025,10');
      assert.equal(index.format('a1a.5b0-0.0*25+10'), '1.500.025,10');
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
    
    it('setMask', () => {
      let input = document.createElement('input');
      input = index.setMask(input);      
      
      writeAll(input, 'a');
      assert.equal(input.value, '0,00');
      assert.equal(input.formatToNumber(), 0);     
      
      writeAll(input, '-10');
      assert.equal(input.value, '0,10');
      assert.equal(input.formatToNumber(), 0.1);   
      
      writeAll(input, '0010');
      assert.equal(input.value, '0,10');
      assert.equal(input.formatToNumber(), 0.10);      
      
      writeAll(input, 'a10a1');
      assert.equal(input.value, '1,01');
      assert.equal(input.formatToNumber(), 1.01);      

      writeAll(input, '2.500.02.510');
      assert.equal(input.value, '2.500.025,10');
      assert.equal(input.formatToNumber(), 2500025.1);      

      writeAll(input, 'a1a.5b0-0.0*25+10');
      assert.equal(input.value, '1.500.025,10');
      assert.equal(input.formatToNumber(), 1500025.1);

      writeAll(input, '1.500.025,10');
      assert.equal(input.value, '1.500.025,10');
      assert.equal(input.formatToNumber(), 1500025.10);
    });
  });

  describe('Custom', () => {
    beforeEach(() => {
      index = new Index();
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

    it('format', () => {
      assert.equal(index.format('a'), 'R$_.___.');
      assert.equal(index.format('010'), 'R$_.010.');
      assert.equal(index.format('0010'), 'R$0.010.');
      assert.equal(index.format('a10a1.'), 'R$_.101.');
      assert.equal(index.format('2.500.02.510.'), 'R$250,002.510.');
      assert.equal(index.format('a1a.5b0-0.0*25+10.'), '-R$150,002.510.');
      index.args.negativeSignAfter = true;
      assert.equal(index.format('0010-'), 'R$0.010.-');
    });

    it('formatToNumber', () => {
      assert.equal(index.formatToNumber('R$_.___.'), 0);
      assert.equal(index.formatToNumber('R$_.001.'), 0.001);
      assert.equal(index.formatToNumber('R$_.101.'), 0.101);
      assert.equal(index.formatToNumber('R$250,002.510.'), 250002.51);
      assert.equal(index.formatToNumber('-R$150,002.510.'), -150002.51);
      assert.equal(index.formatToNumber('R$150,002.510.-'), -150002.51);
    }); 
    
    it('setMask', () => {
      let input = document.createElement('input');
      input = index.setMask(input);      
      
      writeAll(input, 'a');
      assert.equal(input.value, 'R$_.___.');
      assert.equal(input.formatToNumber(), 0);      
      
      writeAll(input, '0010');
      assert.equal(input.value, 'R$0.010.');
      assert.equal(input.formatToNumber(), 0.01);      
      
      writeAll(input, 'a10a1');
      assert.equal(input.value, 'R$0.101.');
      assert.equal(input.formatToNumber(), 0.101);      

      writeAll(input, '2.500.02.510');
      assert.equal(input.value, 'R$250,002.510.');
      assert.equal(input.formatToNumber(), 250002.510);      

      writeAll(input, 'a1a.5b0-0.0*25+10');
      assert.equal(input.value, '-R$150,002.510.');
      assert.equal(input.formatToNumber(), -150002.51);

      writeAll(input, '1.500.025,10');
      assert.equal(input.value, 'R$150,002.510.');
      assert.equal(input.formatToNumber(), 150002.51);

      writeAll(input, '1.500.025,10-');
      assert.equal(input.value, '-R$150,002.510.');
      assert.equal(input.formatToNumber(), -150002.51);
      
      index.args.negativeSignAfter = true;

      writeAll(input, '1.500.025,10-');
      assert.equal(input.value, 'R$150,002.510.-');
      assert.equal(input.formatToNumber(), -150002.51);
    });
  });
});
