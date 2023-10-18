export type { SimpleMaskMoneyConfiguration } from 'src/types';

export type { SetMaskFunction } from 'src/set-mask';
export type { RemoveMaskFunction } from 'src/remove-mask';
export type { FormatToNumberFunction } from 'src/format-to-number';
export type { CreateInstanceOfFunction } from 'src/create-instance-of';
export type { FormatToCurrencyFunction } from 'src/format-to-currency';

import setMask from 'src/set-mask';
import removeMask from 'src/remove-mask';
import formatToNumber from 'src/format-to-number';
import createInstanceOf from 'src/create-instance-of';
import formatToCurrency from 'src/format-to-currency';

const SimpleMaskMoney = { setMask, removeMask, formatToNumber, createInstanceOf, formatToCurrency };

export default SimpleMaskMoney;

export { setMask, removeMask, formatToNumber, createInstanceOf, formatToCurrency };
