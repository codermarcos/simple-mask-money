import type { SimpleMaskMoneyConfiguration } from 'src/types';

import getBaseConfiguration from 'src/get-base-configuration';
import formatToNumber from 'src/format-to-number';

/**
 * Returns the formated input.
 *
 * @param value - The first can be a number or string
 * @param configuration - The second is the configuration
 * @returns The a formated input ex: input -> `0.66` and `$0,66`
 */
function formatToCurrency(value: number | string, currentConfiguration?: Partial<SimpleMaskMoneyConfiguration>) {
  
  const { 
    fixed,
    prefix, suffix, 
    fractionDigits,
    thousandsSeparator, decimalSeparator,
    allowNegative, negativeSignAfter,
  } = getBaseConfiguration(currentConfiguration);

  const completer = fixed ? '0' : '_';

  const addPrefixAndSuffix = (v: string) => `${prefix}${v}${suffix}`;
  const fillDecimals = (v: string) => v.padEnd(fractionDigits, completer);
  
  const srtValue = value.toString();

  if (srtValue.length === 0) return addPrefixAndSuffix(`${completer}${decimalSeparator}${fillDecimals('')}`);

  let output = '';

  const isNegative = allowNegative && srtValue.includes('-');

  const numberValue = formatToNumber(value, currentConfiguration);

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
