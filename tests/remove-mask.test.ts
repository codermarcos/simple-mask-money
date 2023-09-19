import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { HTMLInputElementMasked } from 'src/types';

import { createWriter } from './helpers';

import removeMask from 'src/remove-mask';
import setMask from 'src/set-mask';

describe(
  'removeMask', 
  () => {
    
    let clear: () => void;
    let input: HTMLInputElementMasked;
    let write: ReturnType<typeof createWriter>;

    beforeEach(
      () => {
        input = document.createElement('input');
        document.body.appendChild(input);
        write = createWriter(input);
      }
    );

    afterEach(
      () => {
        document.body.removeChild(input);
        if (typeof clear === 'function') clear();
      }
    );

    it(
      'should call remove function of input', 
      () => {
        const spyRemoveMask = jest.fn() as () => void;

        input.removeMask = spyRemoveMask;

        clear = removeMask('input');

        clear();

        expect(spyRemoveMask).toHaveBeenCalled();
      },
    );

    it(
      'should should remove mask when pass an input element', 
      () => {
        expect(input.value).toEqual('');

        setMask(input);

        expect(input.value).toEqual('0,00');
        
        write('123');

        expect(input.value).toEqual('1,23');

        clear = removeMask(input);
        
        clear();
        
        write('123');

        expect(input.value).toEqual('1,23');
      },
    );
    
    it(
      'should not throw when pass an invalid input element', 
      () => {
        clear = removeMask('none');

        expect(() => clear()).not.toThrow();
      },
    );

    it(
      'should not throw when pass null', 
      () => {
        clear = removeMask(null);

        expect(() => clear()).not.toThrow();
      },
    );

    it(
      'should throw an error when pass an element that is not an input', 
      () => {
        expect(() => removeMask(document.body as unknown as HTMLInputElementMasked)).toThrow(new Error('the element must be an input'));
      },
    );
  }
);
