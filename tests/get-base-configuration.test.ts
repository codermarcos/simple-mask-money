import { describe, expect, it } from '@jest/globals';

import getBaseConfiguration from 'src/get-base-configuration';

describe(
  'getBaseConfiguration',
  () => {

    it(
      'should have base configuration',
      () => {
        expect(getBaseConfiguration()).toEqual({
          allowNegative       : false,
          negativeSignAfter   : false,
          decimalSeparator    : ',',
          fixed               : true,
          fractionDigits      : 2,
          prefix              : '',
          suffix              : '',
          thousandsSeparator  : '.',
          cursor              : 'end',
          allowEmpty          : false,
        });
      },
    );

    it(
      'should have base configuration',
      () => {
        const fractionDigits = 4;
        const decimalSeparator = '.';
        const prefix = 'R$';
        const allowNegative = true;
        const cursor = 'move';

        const result = getBaseConfiguration({
          allowNegative,
          decimalSeparator,
          fractionDigits,
          prefix,
          cursor
        });

        expect(result).toEqual({
          allowNegative,
          negativeSignAfter   : false,
          decimalSeparator,
          fixed               : true,
          fractionDigits,
          suffix              : '',
          prefix,
          thousandsSeparator  : '.',
          cursor,
          allowEmpty          : false,
        });
      },
    );

  },
);
