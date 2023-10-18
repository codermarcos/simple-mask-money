import { describe, expect, it } from '@jest/globals';

import * as SimpleMaskMoney from 'src/simple-mask-money';

describe(
  'simple-mask-money', 
  () => {
    it(
      'should export correct elements', 
      () => {
        const keysDefaultExported = Object.keys(SimpleMaskMoney.default);
        const keys = Object.keys(SimpleMaskMoney);
        expect(keysDefaultExported.length).toEqual(5);
        expect(keys.length).toEqual(6);
        expect(keys).toContain('default');
      },
    );

    it.each(['setMask', 'removeMask', 'formatToNumber', 'createInstanceOf', 'formatToCurrency'])(
      'should have all keys to default and to named export',
      (propertyName) => {
        expect(SimpleMaskMoney.default).toHaveProperty(propertyName);
        expect(SimpleMaskMoney).toHaveProperty(propertyName);
        expect(typeof SimpleMaskMoney[propertyName as keyof typeof SimpleMaskMoney])
          .toBe('function');
        expect(typeof SimpleMaskMoney.default[propertyName as keyof typeof SimpleMaskMoney.default])
          .toBe('function');
      }
    );
  }
);
