export type SimpleMaskMoneyConfiguration = {
  afterFormat?(value: string): void; 
  beforeFormat?(value: string): string;

  allowNegative: boolean;
  negativeSignAfter: boolean;

  decimalSeparator: string;
  thousandsSeparator: string;

  fixed: boolean;

  fractionDigits: number;

  prefix: string;
  suffix: string;
  
  cursor: 'move' | 'end';
}

export type HTMLInputElementMasked = HTMLInputElement & Partial<Record<'removeMask', () => void>>;
