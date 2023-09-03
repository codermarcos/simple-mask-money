import { describe, expect } from '@jest/globals';

import setMask from 'src/set-mask';

describe(
  'setMask', 
  () => {

    let clear: () => void;
    let input: HTMLInputElement;

    function write(v: string) {
      v
        .split('')
        .forEach(
          key => input
            .dispatchEvent(
              new KeyboardEvent('keydown', { key })
            )
        );
    }

    beforeEach(
      () => {
        input = document.createElement('input');
        document.body.appendChild(input);

        clear = () => {};
      }
    );

    afterEach(
      () => {
        document.body.removeChild(input);
        clear();
      }
    );

    describe(
      'empty input',
      () => {
        it(
          'should format empty input', 
          () => {
            clear = setMask(input, { prefix: 'R$' });
    
            expect(input.value).toBe('R$0,00');
          },
        );
        
        it(
          'should format empty input when not fixed', 
          () => {
            clear = setMask(input, { prefix: 'R$', fixed: false });
    
            expect(input.value).toBe('R$_,__');
          },
        );
      }
    );

    describe(
      'shouldn\'t allow certain keys',
      () => {    
        it(
          'shouldn\'t type letters', 
          () => {
            clear = setMask(input, { prefix: 'R$' });

            write('abc');

            expect(input.value).toBe('R$0,00');
          },
        );
      }
    );

    
    it(
      'should format first value', 
      () => {
        input.value = '0,50';

        clear = setMask(input, { prefix: 'R$' });

        expect(input.value).toBe('R$0,50');
      },
    );

    it(
      'should format first value', 
      () => {
        input.value = '666,50';

        clear = setMask(input, { prefix: 'R$' });

        expect(input.value).toBe('R$666,50');
      },
    );

    it(
      'should format when type cents only', 
      () => {
        clear = setMask(input, { prefix: 'R$' });

        write('69');

        expect(input.value).toBe('R$0,69');
      },
    );

    
    it(
      'should format when type 666', 
      () => {
        clear = setMask(input, { prefix: 'R$' });

        write('666');

        expect(input.value).toBe('R$6,66');
      },
    );

  },
);
