import { describe, expect, it } from '@jest/globals';

import * as SimpleMaskMoney from 'src/simple-mask-money';

describe(
  'simple-mask-money', 
  () => {
    it(
      'should export correct elements', 
      () => {
        const keys = Object.keys(SimpleMaskMoney);
        expect(keys.length).toEqual(5);
        expect(keys).toContain('setMask');
        expect(keys).toContain('removeMask');
        expect(keys).toContain('formatToNumber');
        expect(keys).toContain('formatToCurrency');
        expect(keys).toContain('createInstanceOf');
      },
    );

    it.each(Object.keys(SimpleMaskMoney))(
      'should export correct elements with correct functions', 
      (functionName) => {
        expect(SimpleMaskMoney).toHaveProperty(functionName);
        expect(typeof SimpleMaskMoney[functionName as keyof typeof SimpleMaskMoney])
          .toBe('function');
      },
    );
  }
);
