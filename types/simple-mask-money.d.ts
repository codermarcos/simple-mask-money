interface ISimpleMaskMoneyArgs {
  afterFormat: (e: string) => {};
  allowNegative: boolean;
  beforeFormat: (e: string) => {};
  negativeSignAfter: boolean;
  decimalSeparator: string;
  fixed: boolean;
  fractionDigits: number;
  prefix: string;
  suffix: string;
  thousandsSeparator: string;
  cursor: 'start' | 'move' | 'end';
}

declare class SimpleMaskMoney {
  static args: ISimpleMaskMoneyArgs;
  static formatToCurrency(value: number | string, args?: ISimpleMaskMoneyArgs): string;
  static formatToMask(value: number | string, args?: ISimpleMaskMoneyArgs): string;
  static formatToNumber(value: string, args?: ISimpleMaskMoneyArgs): number;
  static setMask(element: string | HTMLInputElement, args?: ISimpleMaskMoneyArgs): HTMLInputElement;
}

declare module 'simple-mask-money' {
  export = SimpleMaskMoney;
}

