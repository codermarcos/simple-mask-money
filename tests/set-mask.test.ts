import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';

import { createWriter } from './helpers';

import setMask from 'src/set-mask';

describe(
  'setMask', 
  () => {
    
    let clear: () => void;
    let input: HTMLInputElement;
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

    describe(
      'should format empty input',
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

    describe(
      'should format first value',
      () => {
        it(
          'should format first value only cents', 
          () => {
            input.value = '0,50';

            clear = setMask(input, { prefix: 'R$' });

            expect(input.value).toBe('R$0,50');
          },
        );

        it(
          'should format first value with dozens and cents', 
          () => {
            input.value = '666,50';

            clear = setMask(input, { prefix: 'R$' });

            expect(input.value).toBe('R$666,50');
          },
        );

        it(
          'should format first value with thousands using correct separator', 
          () => {
            input.value = '999666,50';

            clear = setMask(input, { prefix: 'R$' });

            expect(input.value).toBe('R$999.666,50');
          },
        );

        it(
          'should format first value with thousands using a default separator', 
          () => {
            input.value = '999666.50';

            clear = setMask(input, { prefix: 'R$' });

            expect(input.value).toBe('R$999.666,50');
          },
        );

        it(
          'should format first value with formated number', 
          () => {
            input.value = 'R$999.666,50';

            clear = setMask(input, { prefix: 'R$' });

            expect(input.value).toBe('R$999.666,50');
          },
        );

        it(
          'should format first value with wrong number bigger than max decimal digits', 
          () => {
            input.value = 'R$999.666,999';

            clear = setMask(input, { prefix: 'R$' });

            expect(input.value).toBe('R$999.666,99');
          },
        );
      }
    );
    
    describe(
      'should format when type',
      () => {
        it(
          'should format when type cents only', 
          () => {
            clear = setMask(input, { prefix: 'R$' });
    
            write('69');
    
            expect(input.value).toBe('R$0,69');
          },
        );
        
        it(
          'should format when type cents and dozens', 
          () => {
            clear = setMask(input, { prefix: 'R$' });
    
            write('666');
    
            expect(input.value).toBe('R$6,66');
          },
        );
        
        it(
          'should format when type thousands', 
          () => {
            clear = setMask(input, { prefix: 'R$' });
    
            write('666999');
    
            expect(input.value).toBe('R$6.669,99');
          },
        );
        
        it(
          'should format when type number sequentialy', 
          () => {
            clear = setMask(input, { prefix: 'R$' });
    
            write('1234567');
    
            expect(input.value).toBe('R$12.345,67');
          },
        );
      }
    );

    describe(
      'should format when type when have suffix',
      () => {
        it(
          'should format when type cents only', 
          () => {
            clear = setMask(input, { prefix: 'R$', suffix: 'BRL' });
    
            write('69');
    
            expect(input.value).toBe('R$0,69BRL');
          },
        );
        
        it(
          'should format when type cents and dozens', 
          () => {
            clear = setMask(input, { prefix: 'R$', suffix: 'BRL' });
    
            write('666');
    
            expect(input.value).toBe('R$6,66BRL');
          },
        );
        
        it(
          'should format when type thousands', 
          () => {
            clear = setMask(input, { prefix: 'R$', suffix: 'BRL' });
    
            write('666999');
    
            expect(input.value).toBe('R$6.669,99BRL');
          },
        );
        
        it(
          'should format when type number sequentialy', 
          () => {
            clear = setMask(input, { prefix: 'R$', suffix: 'BRL' });
    
            write('1234567');
    
            expect(input.value).toBe('R$12.345,67BRL');
          },
        );
      }
    );

    // Only basic tests because jsdom doesn't work to simulate user actions
    // Real tests at cypress
    describe(
      'should format correct when move caret',
      () => {
        it(
          'should format when caret is on start', 
          () => {
            const options = { prefix: 'R$' };
            clear = setMask(input, options);

            input.focus();

            input.setSelectionRange(options.prefix.length, options.prefix.length);
    
            write('1');
    
            expect(input.value).toBe('R$10,00');
          },
        );
      }
    );
  },
);
