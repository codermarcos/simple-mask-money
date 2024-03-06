/// <reference types="cypress" />

import type { SimpleMaskMoneyConfiguration } from '../../../src/types';

const getUrl = (configuration: Partial<SimpleMaskMoneyConfiguration>, initalValue?: string, attr?: Array<string>) => {
  const options = new Array<string>();

  Object.keys(configuration).forEach((key) => options.push(`${key}=${encodeURIComponent(configuration[key])}`));

  if (initalValue) options.push(`initialValue=${initalValue}`);
  if (attr) options.push(`attributes=${attr.join(',')}`);

  return `./cypress/file/?${options.join('&')}`;
};


describe(
  'input behaviour',
  () => {
    describe(
      'readonly',
      () => {

        beforeEach(
          () => {
            cy.visit(getUrl({ prefix: '$', suffix: 'CAD' }, '6.66', ['readonly']));
            cy.reload();
          }
        );
    
        it(
          'should format when input was created',
          () => {
            cy.get('input').should('have.value', '$6,66CAD');
          }
        );
    
        it(
          'shouldn\'t allow type when is readonly',
          (done) => {
            const prevent = async (error) => {
              const passed = error.message.includes('readonly');
              cy.off('fail', prevent);
              if (passed) done();
              return !passed;
            };

            cy.on('fail', prevent);
            cy.get('input').type('123', { timeout: 100 });
          }
        );
      }
    );

    describe(
      'readonly',
      () => {

        beforeEach(
          () => {
            cy.visit(getUrl({ prefix: '$', suffix: 'CAD' }, '6.66', ['disabled']));
            cy.reload();
          }
        );
    
        it(
          'should format when input was created',
          () => {
            cy.get('input').should('have.value', '$6,66CAD');
          }
        );
    
        it(
          'shouldn\'t allow type when is disabled',
          (done) => {
            const prevent = async (error) => {
              const passed = error.message.includes('disabled');
              cy.off('fail', prevent);
              if (passed) done();
              return !passed;
            };

            cy.on('fail', prevent);
            
            cy.get('input').type('123', { timeout: 100 });
          }
        );
      }
    );

    describe(
      'form submit', 
      () => {
        beforeEach(
          () => {
            cy.visit(getUrl({ prefix: '$', suffix: 'CAD' }, '6.66'));
          }
        );

        it(
          'should trigger form submit',
          (done) => {
            const spy = cy.spy().as('submit');
            
            cy.get('form').then(form$ => {
              form$.on('submit', e => {
                e.preventDefault();
                spy();
                done();
              });
            });
            
            cy.get('input').type('{Enter}');

            cy.get('@submit').should('have.not.been.called');
          },
        );
      }
    );
  }
);

describe(
  'cursor',
  () => {

    describe(
      'cursor lock',
      () => {
        beforeEach(
          () => {
            cy.visit(getUrl({ prefix: '$', suffix: 'AUD' }, '6.66'));
          }
        );

        it(
          'shouldn\'t allow move the cursor',
          () => {
            cy.get('input').should('have.value', '$6,66AUD');
            cy.get('input').type('{leftArrow}');
            cy.get('input').should('have.prop', 'selectionStart', 5);
            cy.get('input').should('have.prop', 'selectionEnd', 5);

            cy.get('input').should('have.value', '$6,66AUD');
            cy.get('input').type('{rightArrow}');
            cy.get('input').should('have.prop', 'selectionStart', 5);
            cy.get('input').should('have.prop', 'selectionEnd', 5);

            cy.get('input').should('have.value', '$6,66AUD');
            cy.get('input').type('{upArrow}');
            cy.get('input').should('have.prop', 'selectionStart', 5);
            cy.get('input').should('have.prop', 'selectionEnd', 5);

            cy.get('input').should('have.value', '$6,66AUD');
            cy.get('input').type('{upArrow}');
            cy.get('input').should('have.prop', 'selectionStart', 5);
            cy.get('input').should('have.prop', 'selectionEnd', 5);
          }
        );
      }
    );

    describe(
      'cursor move',
      () => {
        beforeEach(
          () => {
            cy.visit(getUrl({ prefix: '$', suffix: 'AUD', cursor: 'move' }, '6.66'));
          }
        );

        it(
          'should insert caracter at correct position',
          () => {
            cy.get('input').should('have.value', '$6,66AUD');
            cy.get('input').type('{leftArrow}');
            cy.get('input').type('9');
            cy.get('input').should('have.value', '$66,96AUD');
          }
        );

        it(
          'shouldn\'t erase prefix',
          () => {
            cy.get('input').should('have.value', '$6,66AUD');
            cy.get('input').type('{backspace}'.repeat(8));
            cy.get('input').type('123');
            cy.get('input').should('have.value', '$1,23AUD');
            cy.get('input').type('{leftArrow}'.repeat(4));
            cy.get('input').type('2');
            cy.get('input').should('have.value', '$21,23AUD');
          }
        );
        
        it(
          'should keep caret at correct position after inserted',
          () => {
            cy.get('input').should('have.value', '$6,66AUD');
            cy.get('input').type('{leftArrow}');
            cy.get('input').type('9');
            cy.get('input').should('have.value', '$66,96AUD');
            cy.get('input').type('{backspace}');
            cy.get('input').should('have.value', '$6,66AUD');
          }
        );
        
        it(
          'should keep caret at correct position after clear',
          () => {
            cy.get('input').should('have.value', '$6,66AUD');
            cy.get('input').type('{leftArrow}');
            cy.get('input').type('9');
            cy.get('input').should('have.value', '$66,96AUD');
            cy.get('input').type('{leftArrow}');
            cy.get('input').type('{backspace}'.repeat(2));
            cy.get('input').should('have.value', '$0,96AUD');
          }
        );
      }
    );
  },
);

describe(
  'clear',
  () => {
    beforeEach(
      () => {
        cy.visit(getUrl({ prefix: '$', suffix: 'AUD', cursor: 'move' }, '666.99'));
      }
    );

    it(
      'should clear using selection',
      () => {
        cy.get('input').should('have.value', '$666,99AUD');
        cy.get('input').type('{selectall}{backspace}');
        cy.get('input').should('have.value', '$0,00AUD');
      }
    );

    it(
      'should undo action',
      () => {
        cy.get('input').should('have.value', '$666,99AUD');

        cy.get('input').type('{backspace}'.repeat(2));
        cy.get('input').should('have.value', '$6,66AUD');

        cy.get('input').type('{ctrl+z}');
        cy.get('input').should('have.value', '$666,99AUD');
      }
    );
  },
);

describe(
  'prefix and suffix',
  () => {
    describe(
      'common behaviour',
      () => {
        beforeEach(
          () => {
            cy.visit(getUrl({ prefix: '$', suffix: 'CAD' }));
            cy.reload();
          }
        );
    
        it(
          'should format when input was created',
          () => {
            cy.get('input').should('have.value', '$0,00CAD');
          }
        );
    
        it(
          'shouldn\'t allow type a letter',
          () => {
            cy.get('input').type('abc');
            cy.get('input').should('have.value', '$0,00CAD');
          }
        );
    
        it(
          'should format when type only cents',
          () => {
            cy.get('input').type('1');
            cy.get('input').should('have.value', '$0,01CAD');
    
            cy.get('input').type('{backspace}');
            cy.get('input').should('have.value', '$0,00CAD');
    
            cy.get('input').type('12');
            cy.get('input').should('have.value', '$0,12CAD');
    
            cy.get('input').type('{backspace}'.repeat(2));
            cy.get('input').should('have.value', '$0,00CAD');
    
            cy.get('input').type('66');
            cy.get('input').should('have.value', '$0,66CAD');
          }
        );
    
        it(
          'should format dozens',
          () => {
            cy.get('input').type('123');
            cy.get('input').should('have.value', '$1,23CAD');
    
    
            cy.get('input').type('{backspace}'.repeat(3));
            cy.get('input').should('have.value', '$0,00CAD');
    
            cy.get('input').type('1234');
            cy.get('input').should('have.value', '$12,34CAD');
    
            cy.get('input').type('{backspace}'.repeat(4));
            cy.get('input').should('have.value', '$0,00CAD');
    
            cy.get('input').type('6666');
            cy.get('input').should('have.value', '$66,66CAD');
          }
        );
    
        it(
          'should format hundreds',
          () => {
            cy.get('input').type('12345');
            cy.get('input').should('have.value', '$123,45CAD');
    
            cy.get('input').type('{backspace}'.repeat(5));
            cy.get('input').should('have.value', '$0,00CAD');
    
            cy.get('input').type('66699');
            cy.get('input').should('have.value', '$666,99CAD');
          }
        );
      }
    );
    
    describe(
      'wrong behaviour prefix and suffix with space',
      () => {	
        beforeEach(
          () => {
            cy.visit(getUrl({ prefix: '$ ', suffix: ' CAD' }));
            cy.reload();
          }
        );
    
        it(
          'should format when input was created',
          () => {
            cy.get('input').should('have.value', '$ 0,00 CAD');
          }
        );
    
        it(
          'shouldn\'t allow type a letter',
          () => {
            cy.get('input').type('abc');
            cy.get('input').should('have.value', '$ 0,00 CAD');
          }
        );
    
        it(
          'should format when type only cents',
          () => {
            cy.get('input').type('1');
            cy.get('input').should('have.value', '$ 0,01 CAD');
    
            cy.get('input').type('{backspace}');
            cy.get('input').should('have.value', '$ 0,00 CAD');
    
            cy.get('input').type('12');
            cy.get('input').should('have.value', '$ 0,12 CAD');
    
            cy.get('input').type('{backspace}'.repeat(2));
            cy.get('input').should('have.value', '$ 0,00 CAD');
    
            cy.get('input').type('66');
            cy.get('input').should('have.value', '$ 0,66 CAD');
          }
        );
    
        it(
          'should format dozens',
          () => {
            cy.get('input').type('123');
            cy.get('input').should('have.value', '$ 1,23 CAD');
    
    
            cy.get('input').type('{backspace}'.repeat(3));
            cy.get('input').should('have.value', '$ 0,00 CAD');
    
            cy.get('input').type('1234');
            cy.get('input').should('have.value', '$ 12,34 CAD');
    
            cy.get('input').type('{backspace}'.repeat(4));
            cy.get('input').should('have.value', '$ 0,00 CAD');
    
            cy.get('input').type('6666');
            cy.get('input').should('have.value', '$ 66,66 CAD');
          }
        );
    
        it(
          'should format hundreds',
          () => {
            cy.get('input').type('12345');
            cy.get('input').should('have.value', '$ 123,45 CAD');
    
            cy.get('input').type('{backspace}'.repeat(5));
            cy.get('input').should('have.value', '$ 0,00 CAD');
    
            cy.get('input').type('66699');
            cy.get('input').should('have.value', '$ 666,99 CAD');
          }
        );
      }
    );
  }
);

describe(
  'negative numbers',
  () => {
    describe(
      'should start with negative when allowed',
      () => {
        beforeEach(
          () => {
            cy.visit(getUrl({ allowNegative: true }, '-6.99'));
          }
        );
    
        it(
          'should allow add negative sign',
          () => {
            cy.get('input').should('have.value', '-6,99');
            cy.get('input').type('-');
            cy.get('input').should('have.value', '-6,99');
          }
        );
      }
    );

    describe(
      'should allow add and remove negative sign correctly',
      () => {
        beforeEach(
          () => {
            cy.visit(getUrl({ allowNegative: true, cursor: 'move' }));
          }
        );
    
        it(
          'should allow add negative sign',
          () => {
            cy.get('input').should('have.value', '0,00');
            cy.get('input').type('-');
            cy.get('input').should('have.value', '-0,00');
          }
        );
    
        it(
          'should allow add only one negative sign',
          () => {
            cy.get('input').should('have.value', '0,00');
            cy.get('input').type('----');
            cy.get('input').should('have.value', '-0,00');
          }
        );
    
        it(
          'should allow write with negative sign',
          () => {
            cy.get('input').should('have.value', '0,00');
            cy.get('input').type('666');
            cy.get('input').type('-');
            cy.get('input').should('have.value', '-6,66');
            cy.get('input').type('963');
            cy.get('input').should('have.value', '-6.669,63');
          }
        );
        
        it(
          'should keep caret at correct position after inserted',
          () => {
            cy.get('input').type('6-66');
            cy.get('input').should('have.value', '-6,66');
            cy.get('input').type('{leftArrow}');
            cy.get('input').type('9');
            cy.get('input').should('have.value', '-66,96');
            cy.get('input').type('{backspace}');
            cy.get('input').should('have.value', '-6,66');
          }
        );
        
        it(
          'should keep caret at correct position after clear',
          () => {
            cy.get('input').type('6-66');
            cy.get('input').should('have.value', '-6,66');
            cy.get('input').type('{leftArrow}');
            cy.get('input').type('9');
            cy.get('input').should('have.value', '-66,96');
            cy.get('input').type('{leftArrow}');
            cy.get('input').type('{backspace}'.repeat(2));
            cy.get('input').should('have.value', '-0,96');
          }
        );
      }
    );

    describe(
      'should allow add and remove negative sign correctly when it is after numbers',
      () => {
        beforeEach(
          () => {
            cy.visit(getUrl({ allowNegative: true, negativeSignAfter: true, cursor: 'move' }));
          }
        );
    
        it(
          'should allow add negative sign',
          () => {
            cy.get('input').should('have.value', '0,00');
            cy.get('input').type('-');
            cy.get('input').should('have.value', '0,00-');
          }
        );
    
        it(
          'should allow add only one negative sign',
          () => {
            cy.get('input').should('have.value', '0,00');
            cy.get('input').type('----');
            cy.get('input').should('have.value', '0,00-');
          }
        );
    
        it(
          'should allow write with negative sign',
          () => {
            cy.get('input').should('have.value', '0,00');
            cy.get('input').type('666');
            cy.get('input').type('-');
            cy.get('input').should('have.value', '6,66-');
            cy.get('input').type('963');
            cy.get('input').should('have.value', '6.669,63-');
          }
        );
        
        it(
          'should keep caret at correct position after inserted',
          () => {
            cy.get('input').type('6-66');
            cy.get('input').should('have.value', '6,66-');
            cy.get('input').type('{leftArrow}');
            cy.get('input').type('9');
            cy.get('input').should('have.value', '66,69-');
            cy.get('input').type('{backspace}');
            cy.get('input').should('have.value', '6,66-');
          }
        );
        
        it(
          'should keep caret at correct position after clear',
          () => {
            cy.get('input').type('6-99'); // 6,99-|
            cy.get('input').should('have.value', '6,99-');
            cy.get('input').type('{leftArrow}'); // 6,99|-
            cy.get('input').type('3');
            cy.get('input').should('have.value', '69,93-');
            cy.get('input').type('{leftArrow}'.repeat(2)); // 69,|93-
            cy.get('input').type('{backspace}'.repeat(2)); // 0,|93-
            cy.get('input').should('have.value', '0,93-');
            cy.get('input').type('{rightArrow}'.repeat(3)); // 0,93-|
            cy.get('input').type('{backspace}');
            cy.get('input').should('have.value', '0,93');
          }
        );
      }
    );
  }
);
