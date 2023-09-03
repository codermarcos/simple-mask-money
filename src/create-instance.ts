import type { SimpleMaskMoneyConfiguration } from 'src/types';

import setMask from 'src/set-mask';
import formatToNumber from 'src/format-to-number';
import formatToCurrency from 'src/format-to-currency';

function createInstance(configuration: SimpleMaskMoneyConfiguration) {

  const instancesformatToCurrency =
    (
      value: number | string,
      overrideInstanceConfiguration: Partial<SimpleMaskMoneyConfiguration>,
    ) => formatToCurrency(value, overrideInstanceConfiguration ?? configuration);

  const instancesFormatToNumber = 
    (
      value: number | string,
      overrideInstanceConfiguration: Partial<SimpleMaskMoneyConfiguration>,
    ) => formatToNumber(value, overrideInstanceConfiguration ?? configuration);

  const instancesSetMask = 
    (
      element: HTMLInputElement | string | null, 
      overrideInstanceConfiguration?: Partial<SimpleMaskMoneyConfiguration>,
    ) => setMask(element, overrideInstanceConfiguration ?? configuration);

  return {
    formatToCurrency: instancesformatToCurrency,
    formatToNumber: instancesFormatToNumber,
    setMask: instancesSetMask,
  };
}

export default createInstance;
