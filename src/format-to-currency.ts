import type { OptionalSimpleMaskMoneyConfiguration } from 'src/types';

import getBaseConfiguration from 'src/get-base-configuration';
import formatToNumber from 'src/format-to-number';

/**
 * It formats the input value as a currency string based on the provided configuration and returns the formatted output
 * It takes a number or string value and an optional configuration object as input.
 *
 * @param {string | number} value - The first can be a number or string
 * @param {Partial<SimpleMaskMoneyConfiguration>} configuration - The second is the configuration
 * @returns {string} A formated string based on the input value and configuration options e.g when receive `0.66` return `$0,66`
 * 
 * @example
 * Here's an example using from cdn with CSSSelector:
 * ```html
 * <script src=""></script>
 * 
 * <script>
 *     const value = SimpleMaskMoney.formatToCurrency(666.99, { prefix: '$' });
 *     console.log(value); // "$666,99"
 * </script>
 * ```
 * 
 * @example
 * Here's an example using from npm with ESmodules:
 * ```javascript
 * import { formatToCurrency } from 'simple-mask-money';
 * 
 * const value = formatToCurrency(666.99, { prefix: '$' });
 * console.log(value); // "$666,99"
 * ```
 */
function formatToCurrency(
  value: number | string, 
  configuration?: OptionalSimpleMaskMoneyConfiguration,
) {
  
  const { 
    fixed,
    prefix, suffix, 
    fractionDigits,
    thousandsSeparator, decimalSeparator,
    allowNegative, negativeSignAfter,
  } = getBaseConfiguration(configuration);

  const completer = fixed ? '0' : '_';

  const addPrefixAndSuffix = (v: string) => `${prefix}${v}${suffix}`;
  const fillDecimals = (v: string) => v.padEnd(fractionDigits, completer);
  
  const srtValue = value.toString();

  if (srtValue.length === 0) return addPrefixAndSuffix(`${completer}${decimalSeparator}${fillDecimals('')}`);

  let output = '';

  const isNegative = allowNegative && srtValue.includes('-');

  const numberValue = formatToNumber(value, configuration);

  const [thousands, decimals] = numberValue.toString().split('.');

  const formatedDecimal = fillDecimals(
    decimals 
      ? decimals.substring(0, fractionDigits) 
      : ''
  );

  const thousandGroups = [];
  
  for (let i = 0, thousandsLength = thousands.length; i < thousandsLength; i += 3) 
    thousandGroups.push(thousands.substring(i, i + 3));

  output = addPrefixAndSuffix(`${thousandGroups.join(thousandsSeparator)}${decimalSeparator}${formatedDecimal}`);

  if (isNegative)
    output = negativeSignAfter ? `${output}-` : `-${output}`;

  return output;
}

export default formatToCurrency;
/**
 * Check the {@link https://github.com/codermarcos/simple-mask-money/tree/main/examples/4.x.x#SimpleMaskMoney.formatToCurrency | SimpleMaskMoney.formatToCurrency} method to get more information about this type
 * 
 * @remarks
 * This type is part of the {@link https://github.com/codermarcos/simple-mask-money/ | SimpleMaskMoney} to see the full documentation check {@link https://github.com/codermarcos/simple-mask-money/tree/main/examples/4.x.x#SimpleMaskMoney.formatToCurrency | SimpleMaskMoney.formatToCurrency}
 * 
 */
export type FormatToCurrencyFunction = typeof formatToCurrency;
