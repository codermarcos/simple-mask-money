import type {
  OptionalSimpleMaskMoneyConfiguration,
  SimpleMaskMoneyConfiguration,
} from 'src/types';

const configuration: SimpleMaskMoneyConfiguration = {
  allowNegative     : false,
  negativeSignAfter : false,
  decimalSeparator  : ',',
  fixed             : true,
  fractionDigits    : 2,
  prefix            : '',
  suffix            : '',
  thousandsSeparator: '.',
  cursor            : 'end',
};

function getBaseConfiguration(
  current?: OptionalSimpleMaskMoneyConfiguration
): SimpleMaskMoneyConfiguration {
  return Object.assign({ ...configuration }, current);
}

export default getBaseConfiguration;
