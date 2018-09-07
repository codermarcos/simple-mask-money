require('jsdom-global')();
const assert = require('assert');
const implanter = require('../src/implanter');

describe('Implanter', () => {

  describe('getCaretPosition', () => {
    let input;

    beforeEach(() => {      
      input = document.createElement('input');
    });

    it('position initial', () => {
      input.focus();      
      assert.equal(implanter.getCaretPosition(input), 0);
    });

    it('position one', () => {
      input.value = '1';      
      input.focus();
      input.setSelectionRange(1, 1);
      assert.equal(implanter.getCaretPosition(input), 1);
    });
  });

  describe('setCaretPosition', () => {
    let input;

    beforeEach(() => {      
      input = document.createElement('input');
    });

    it('setting position with input empty', () => {
      implanter.setCaretPosition(input, 1);
      assert.equal(input.selectionStart, 0);
    });

    it('setting position one', () => {
      input.value = '1';
      implanter.setCaretPosition(input, 1);
      assert.equal(input.selectionStart, 1);
    });
  });

  describe('indexMove', () => {
    it('from 3 to 3', () => {
      // 0.0|0
      assert.equal(implanter.indexMove('0.00', '0.00'), 0);
    });

    it('from 2 to 3', () => {
      // 0.0|0
      assert.equal(implanter.indexMove('0.0', '0.00'), 1);
    });
    
    it('from 3 to 2', () => {
      // 0.0|0
      assert.equal(implanter.indexMove('0.00', '0.0'), -1);
    });

    it('from 3 to 4', () => {
      // 12.|34
      assert.equal(implanter.indexMove('12.34', '125.34'), 1);
    });

    it('from 4 to 3', () => {
      // 12.|34
      assert.equal(implanter.indexMove('125.34', '12.34'), -1);
    });

    it('from 2 to 3', () => {
      // 1|23.45
      assert.equal(implanter.indexMove('123.45', '1,623.45'), 1);
    });

    it('from 3 to 2', () => {
      // 1|23.45
      assert.equal(implanter.indexMove('1,623.45', '123.45'), -1);
    });
  });
});
