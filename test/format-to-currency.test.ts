import { describe, expect } from '@jest/globals';

import formatToCurrency from 'src/format-to-currency';

describe(
  'formatToCurrency', 
  () => {

    it(
      'should format short integer number to currency', 
      () => {
        expect(formatToCurrency(36)).toBe('36,00');
      },
    );
    
    it(
      'should format long integer number to currency', 
      () => {
        expect(formatToCurrency(666999666)).toBe('666.999.666,00');
      },
    );

    it(
      'should format long string with numbers to currency', 
      () => {
        expect(formatToCurrency('666A999A666')).toBe('666.999.666,00');
      },
    );

    it(
      'should format long float number to currency', 
      () => {
        expect(formatToCurrency(666999.666)).toBe('666.999,66');
      },
    );

    it(
      'should add prefix to empty value', 
      () => {
        expect(formatToCurrency('', { prefix: '$' })).toBe('$0,00');
      },
    );
    
    it(
      'should add prefix', 
      () => {
        expect(formatToCurrency(666, { prefix: '$' })).toBe('$666,00');
      },
    );

  },
);
