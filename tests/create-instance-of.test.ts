import { beforeAll, describe, expect, it } from '@jest/globals';

import createInstanceOf from 'src/create-instance-of';
import formatToCurrency, { FormatToCurrencyFunction } from 'src/format-to-currency';

describe(
  'createInstanceOf', 
  () => {
    describe(
      'create instance of default params to formatToCurrency',
      () => {
        let fn: FormatToCurrencyFunction;

        beforeAll(
          () => {
            fn = createInstanceOf(formatToCurrency, {
              prefix: '$',
              suffix: 'USD',
            });
          }
        );

        it(
          'should use previous value setted before', 
          () => {
            expect(fn(1666.99)).toEqual('$1.666,99USD');
          },
        );

        it(
          'should keep pre-defined cofiguration and merged with new configuration', 
          () => {
            expect(fn(1666.99, { suffix: 'BRL' })).toEqual('$1.666,99BRL');
          },
        );
      }
    );
  }
);
