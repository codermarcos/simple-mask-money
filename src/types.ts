/**
 * This is the full configuration for the mask.
 *
 * @interface SimpleMaskMoneyConfiguration
 *
 * @field {(value: string) => void} afterFormat is used for get the value when the mask is already applied
 * @field {(value: string) => string} beforeFormat is used for get the value when the mask will be applied
 *
 * @field {boolean} allowNegative is used for define if allow values less than zero
 * @field {boolean} negativeSignAfter is used for define if negative sign should be after the number
 *
 * @field {string} decimalSeparator is used for define the separator of decimals digits
 * @field {string} thousandsSeparator is used for define the separator of thousands digits
 *
 * @field {boolean} fixed is used for define if your value can be empty or always should have value
 *
 * @field {number} fractionDigits is used for define the quantity of decimals digits
 *
 * @field {string} prefix is used for define a string that always precedes its value
 * @field {string} suffix is used for define a string that always follows its value
 *
 * @field {'move' | 'end'} cursor is used for define the position of the cursor when the user focus the input
 */
export type SimpleMaskMoneyConfiguration = {
  /** Called after format the value when the mask is already applied */
  afterFormat?(value: string): void;
  /** Called before format the value when the mask will be applied */
  beforeFormat?(value: string): string;

  /** **Default:** `false` - Define if allow values less than zero */
  allowNegative: boolean;
  /** **Default:** `false` - Define if negative sign should be after the number */
  negativeSignAfter: boolean;

  /** **Default:** `','` - Define the separator of decimals digits */
  decimalSeparator: string;
  /** **Default:** `'.'` - Define the separator of thousands digits */
  thousandsSeparator: string;

  /** **Default:** `'.'` - Define if your value can be empty or always should have value */
  fixed: boolean;

  /** **Default:** `2` - Define the quantity of decimals digits */
  fractionDigits: number;

  /** **Default:** `''` - This string always precedes its value */
  prefix: string;
  /** **Default:** `''` - This string always follows its value */
  suffix: string;

  /** **Default:** `'end'` - Define the position of the cursor when the user focus the input */
  cursor: 'move' | 'end';

  /** **Default:** `false` - Define if allow empty value */
  allowEmpty: boolean;
}

export type OptionalSimpleMaskMoneyConfiguration = Partial<SimpleMaskMoneyConfiguration>;

export type HTMLInputElementMasked = HTMLInputElement & {
  /** This method remove the input mask */
  removeMask?: () => void;
};
