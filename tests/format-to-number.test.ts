import { describe, expect, it } from '@jest/globals';

import formatToNumber from 'src/format-to-number';

describe.only(
  'formatToNumber', 
  () => {

    it(
      'should remove all characteres that is not a number', 
      () => {
        expect(formatToNumber('R$36,00')).toBe(36);
      },
    );

    it(
      'should add float numbers correctly', 
      () => {
        expect(formatToNumber('R$6,66')).toBe(6.66);
      },
    );
    
    it(
      'should get only numbers', 
      () => {
        expect(formatToNumber('A6AA6!a6')).toBe(666);
        expect(formatToNumber('666A999A666')).toBe(666999666); // parseFloat = 666
      },
    );

    it(
      'should get only numbers to long numbers', 
      () => {
        expect(formatToNumber(999666.99)).toBe(999666.99);
      },
    );
    
    it(
      'should get only numbers to long string numbers', 
      () => {
        expect(formatToNumber('999666.99')).toBe(999666.99);
      },
    );
    
    it(
      'should return correct number', 
      () => {
        expect(formatToNumber(3.666)).toBe(3.666);
      },
    );
  },
);
