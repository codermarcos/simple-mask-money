import type { SimpleMaskMoneyConfiguration } from 'src/types';

import getBaseConfiguration from 'src/get-base-configuration';

/**
 * It removes any non-numeric characters from the input string and returns a number.
 * It takes a number or string as input.
 *
 * @param {string | number} value - The first can be a number or string
 * @param {Partial<SimpleMaskMoneyConfiguration>} configuration - The second is the configuration
 * @returns {number} A number with any non-numeric characters removed e.g when receive `$0.66` return `0,66`
 * 
 * @example
 * Here's an example using from cdn with CSSSelector:
 * ```html
 * <script src=""></script>
 * 
 * <script>
 *     const value = SimpleMaskMoney.formatToNumber('$666,99');
 *     // Before save convert to number
 *     console.log(value); // 666.99
 * </script>
 * ```
 * 
 * @example
 * Here's an example using from npm with ESmodules:
 * ```jsx
 * import { formatToCurrency } from 'simple-mask-money';
 * 
 * const value = formatToNumber('$666,99');
 * // Before save convert to number 
 * console.log(value); // 666.99
 * ```
 */
function formatToNumber(
  value: number | string,
  currentConfiguration?: Partial<SimpleMaskMoneyConfiguration>
) {
  const { decimalSeparator } = getBaseConfiguration(currentConfiguration);

  const normalizeNumber = (n: number) =>
    n.toString().replace('.', decimalSeparator);

  const stringIsNumber = (s: string) => {
    const parsedValue = Number(s);
    return Number.isNaN(parsedValue) ? s : normalizeNumber(parsedValue);
  };

  const normalizedValue =
    typeof value === 'number' ? normalizeNumber(value) : stringIsNumber(value);

  const characteres = normalizedValue.split('');

  let result = '';

  for (let character; (character = characteres.shift()); ) {
    if (!Number.isNaN(parseInt(character))) result += character;

    if (character !== decimalSeparator) continue;
    result += '.';
  }

  return parseFloat(result);
}

export default formatToNumber;
