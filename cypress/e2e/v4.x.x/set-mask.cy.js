/// <reference types="cypress" />

describe(
  'cursor',
  () => {

    describe(
      'cursor lock',
      () => {    
        beforeEach(
          () => {
            cy.visit('http://localhost:8080/examples/4.x.x/vanilla?option-to-test=aud&initial-value=6.66')
            cy.reload()
          }
        )
        
        it(
          'shouldn\'t allow move the cursor',
          () => {
            cy.get('input')
              .should('have.value', '$6,66AUD')
              .type('{leftArrow}')
              .should('have.prop', 'selectionStart', 5)
              .should('have.prop', 'selectionEnd', 5);

            cy.get('input')
              .should('have.value', '$6,66AUD')
              .type('{rightArrow}')
              .should('have.prop', 'selectionStart', 5)
              .should('have.prop', 'selectionEnd', 5);
        
            cy.get('input')
              .should('have.value', '$6,66AUD')
              .type('{upArrow}')
              .should('have.prop', 'selectionStart', 5)
              .should('have.prop', 'selectionEnd', 5);

            cy.get('input')
              .should('have.value', '$6,66AUD')
              .type('{upArrow}')
              .should('have.prop', 'selectionStart', 5)
              .should('have.prop', 'selectionEnd', 5);
          }
        )   
      }
    )

    describe.skip(
      'cursor move',
      () => {   
        beforeEach(
          () => {
            cy.visit('http://localhost:8080/examples/4.x.x/vanilla?option-to-test=brl&initial-value=6.66')
            cy.reload()
          }
        )
    
        it(
          'should insert caracter at correct position',
          () => {
            cy.get('input')
              .should('have.value', '$6,66AUD')
              .type('{leftArrow}'.repeat(4))
              .type(9)
              .should('have.value', '$66,96AUD');

            cy.get('input')
              .type('{backspace}'.repeat(4))
              .type(123)
              .should('have.value', '$1,23AUD')
              .type('{leftArrow}'.repeat(7))
              .type(2)
              .should('have.value', '$21,23AUD');
          }
        )
      }
    )
  },
)

describe.skip(
  'clear',
  () => {
    beforeEach(
      () => {
        cy.visit('http://localhost:8080/examples/4.x.x/vanilla?initial-value=666.99')
        cy.reload()
      }
    )
    
    it(
      'should clear using selection',
      () => {
        cy.get('input')
          .should('have.value', '$666,99')
          .type('{selectall}{backspace}')
          .should('have.value', '$0,00');
      }
    )
    
    it(
      'should undo action',
      () => {
        cy.get('input')
          .should('have.value', '$666,99')
          
          .type('{backspace}'.repeat(2))
          .should('have.value', '$6,66')

          .type('{ctrl+z}')
          .should('have.value', '$666,99');
      }
    )
  },
)

describe(
  'BRL Currency',
  () => {
    beforeEach(
      () => {
        cy.visit('http://localhost:8080/examples/4.x.x/vanilla?option-to-test=brl')
        cy.reload()
      }
    )

    it(
      'should format when input was created',
      () => {
        cy.get('input')
          .should('have.value', 'R$0,00');
      }
    )
    
    it(
      'shouldn\'t allow type a letter',
      () => {
        cy.get('input')
          .type('abc')
          .should('have.value', 'R$0,00');
      }
    )
   
    it(
      'should format when type only cents',
      () => {
        const el = cy.get('input');
        el.type(1)
          .should('have.value', 'R$0,01');

        el
          .type('{backspace}')
          .should('have.value', 'R$0,00');
        
        el
          .type(12)
          .should('have.value', 'R$0,12');
        
        el
          .type('{backspace}'.repeat(2))
          .should('have.value', 'R$0,00');

        el
          .type(66)
          .should('have.value', 'R$0,66');
      }
    )

    it(
      'should format dozens',
      () => {
        const el = cy.get('input');

        el.type(123)
          .should('have.value', 'R$1,23')
        
        
        el.type('{backspace}'.repeat(3))
          .should('have.value', 'R$0,00');

        el.type(1234)
          .should('have.value', 'R$12,34')
        
        el.type('{backspace}'.repeat(4))
          .should('have.value', 'R$0,00');

        el.type(6666)
          .should('have.value', 'R$66,66')
      }
    )

    it(
      'should format hundreds',
      () => {
        const el = cy.get('input');

        el.type(12345)
          .should('have.value', 'R$123,45')
      
        el.type('{backspace}'.repeat(5))
          .should('have.value', 'R$0,00');

        el.type(66699)
          .should('have.value', 'R$666,99');
      }
    )
  }
)

