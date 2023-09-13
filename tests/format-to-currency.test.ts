import { describe, expect, it } from '@jest/globals';

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
      'should add prefix with a integer value', 
      () => {
        expect(formatToCurrency(666, { prefix: '$' })).toBe('$666,00');
      },
    );

    it(
      'should format number value with thousands using default separator', 
      () => {
        expect(formatToCurrency(999666.50, { prefix: '$' })).toBe('$999.666,50');
      },
    );

    it(
      'should format number value with thousands using default separator', 
      () => {
        expect(formatToCurrency('999666.50', { prefix: '$' })).toBe('$999.666,50');
      },
    );

    it(
      'should add suffix to empty value', 
      () => {
        expect(formatToCurrency('', { prefix: '$', suffix: 'USD' })).toBe('$0,00USD');
      },
    );

    it(
      'should add suffix to short interger value', 
      () => {
        expect(formatToCurrency(123, { prefix: '$', suffix: 'USD' })).toBe('$123,00USD');
      },
    );

    it(
      'should add suffix to long interger value', 
      () => {
        expect(formatToCurrency(666999, { prefix: '$', suffix: 'USD' })).toBe('$666.999,00USD');
      },
    );

    it(
      'should add suffix to short float value', 
      () => {
        expect(formatToCurrency(666.99, { prefix: '$', suffix: 'USD' })).toBe('$666,99USD');
      },
    );
    
    it(
      'should add suffix to long float value', 
      () => {
        expect(formatToCurrency(9666.99, { prefix: '$', suffix: 'USD' })).toBe('$9.666,99USD');
      },
    );
    
    it(
      'shouldn\'t allow negatives number', 
      () => {
        expect(formatToCurrency(-1)).toBe('1,00');
      },
    );
    
    it(
      'should keep negative number when allowNegative', 
      () => {
        expect(formatToCurrency(-1, { allowNegative: true })).toBe('-1,00');
      },
    );
    
    it(
      'should keep negative number and put sign in the end when allowNegative and negativeSignAfter', 
      () => {
        const result = formatToCurrency(-1, { allowNegative: true, negativeSignAfter: true });
        expect(result).toBe('1,00-');
      },
    );

    it(
      'should works negative with big numbers', 
      () => {
        expect(formatToCurrency(-999666.55, { allowNegative: true })).toBe('-999.666,55');
      },
    );
    
    it(
      'should works negative with big numbers', 
      () => {
        const result = formatToCurrency(-999666.55, { allowNegative: true, negativeSignAfter: true });
        expect(result).toBe('999.666,55-');
      },
    );
    
    it(
      'should works negative with prefix and suffix', 
      () => {
        const result = formatToCurrency(-999666.55, { allowNegative: true, prefix: 'R$', suffix: 'BRL' });
        expect(result).toBe('R$-999.666,55BRL');
      },
    );
    
    it(
      'should works negative with sign after with prefix and suffix', 
      () => {
        const result = formatToCurrency(
          -999666.55, 
          { allowNegative: true, negativeSignAfter: true, prefix: 'R$', suffix: 'BRL' }
        );
        
        expect(result).toBe('R$999.666,55-BRL');
      },
    );

    it(
      'should format formated values', 
      () => {
        expect(formatToCurrency('R$999.666,50', { prefix: '$' })).toBe('$999.666,50');
      },
    );
  },
);
