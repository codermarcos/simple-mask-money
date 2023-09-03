import type { SimpleMaskMoneyConfiguration } from 'src/types';

import getBaseConfiguration from 'src/get-base-configuration';

/**
 * Returns a number based on your input.
 *
 * @param value - The first can be a number or string
 * @param configuration - The second is the configuration
 * @returns The a formated input ex: input -> `$0.66` and `0,66`
 */
function formatToNumber(value: number | string, currentConfiguration?: Partial<SimpleMaskMoneyConfiguration>) {
  const { decimalSeparator } = getBaseConfiguration(currentConfiguration);

  const normalizeNumber = (n: number) => n.toString().replace('.', decimalSeparator);

  const stringIsNumber = (s: string) => {
    const parsedValue = parseFloat(s);
    return Number.isNaN(parsedValue) ? s : normalizeNumber(parsedValue);
  };

  const normalizedValue = typeof value !== 'number'
    ? stringIsNumber(value)
    : normalizeNumber(value);

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
