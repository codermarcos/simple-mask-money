/// <reference types="cypress" />

import type { SimpleMaskMoneyConfiguration } from '../../../src/types';

const getUrl = (configuration: Partial<SimpleMaskMoneyConfiguration>, initalValue?: string) => {
  const options = new Array<string>();

  Object.keys(configuration).forEach((key) => options.push(`${key}=${encodeURIComponent(configuration[key])}`));

  if (initalValue) options.push(`initialValue=${initalValue}`);

  return `./cypress/file/?${options.join('&')}`;
};

describe(
  'cursor',
  () => {

    describe(
      'cursor lock',
      () => {
        beforeEach(
          () => {
            cy.visit(getUrl({ prefix: '$', suffix: 'AUD' }, '6.66'));
            cy.reload();
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
            cy.reload();
          }
        );

        it(
          'should insert caracter at correct position',
          () => {
            cy.get('input').should('have.value', '$6,66AUD');
            cy.get('input').type('{leftArrow}');
            cy.get('input').type('9');
            cy.get('input').should('have.value', '$66,96AUD');

            cy.get('input').type('{backspace}'.repeat(4));
            cy.get('input').type('123');
            cy.get('input').should('have.value', '$1,23AUD');
            cy.get('input').type('{leftArrow}'.repeat(4));
            cy.get('input').type('2');
            cy.get('input').should('have.value', '$21,23AUD');
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
        cy.reload();
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

