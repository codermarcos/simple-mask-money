import type {
  HTMLInputElementMasked,
  OptionalSimpleMaskMoneyConfiguration,
} from 'src/types';

import getBaseConfiguration from 'src/get-base-configuration';
import formatToCurrency from 'src/format-to-currency';

const allowedKeys = [...Array(10).keys(), 'Backspace'].map((n) => n.toString());

/**
 * It applies a mask to an input element, formatting its value as a currency. 
 * It takes an input element and an optional configuration object as parameters. 
 * The function listens for keyboard events on the input element and updates its value accordingly. 
 * It also handles caret positioning and allows for undoing changes. The function returns a method to remove the mask from the input element.
 * 
 * @remarks
 * This method is part of the {@link https://github.com/codermarcos/simple-mask-money/ | SimpleMaskMoney} to see the full documentation check {@link https://github.com/codermarcos/simple-mask-money/tree/main/examples/4.x.x#simplemaskmoneysetmask | SimpleMaskMoney.setMask}
 *
 * @param {HTMLInputElement | string | null} input - The first can be a QueryCSSSelectorString or an Input
 * @param {Partial<SimpleMaskMoneyConfiguration>} configuration - The second is an object with the configuration to check options visit {@link https://github.com/codermarcos/simple-mask-money/tree/main/examples/4.x.x#simplemaskMoneyconfiguration | SimpleMaskMoneyConfiguration}
 * @returns {() => void} A function to remove the input mask
 *
 * @example
 * Here's an example using from cdn with CSSSelector:
 * ```html
 * <script src=""></script>
 * 
 * <input id="my-input" />
 * 
 * <script>
 *     const remove = SimpleMaskMoney.setMask('#my-input');
 *     remove(); // To remove the mask and listeners 
 * </script>
 * ```
 * 
 * @example
 * Here's an example using from npm to React with CSSSelector:
 * ```jsx
 * import { setMask } from 'simple-mask-money';
 * 
 * function InputMoney() {
 *    useEffect(() => setMask('#my-input'), []);
 * 
 *    return <input id="my-input" />;
 * }
 * ```
 *
 * @throws {@link ADD_LINK_AQUI}
 * This exception is thrown if the element is not an input.
 */
function setMask(
  input: HTMLInputElementMasked | HTMLInputElement | string | null,
  configuration?: OptionalSimpleMaskMoneyConfiguration,
) {
  const currentConfiguration = getBaseConfiguration(configuration);

  const {
    beforeFormat,
    afterFormat,
    allowNegative,
    fractionDigits,
    decimalSeparator,
    thousandsSeparator,
    fixed,
    prefix,
    suffix,
    cursor,
  } = currentConfiguration;

  if (typeof document === 'undefined') return () => void 0;

  const element =
    typeof input === 'string' ? document.querySelector(input) : input ?? null;

  if (element === null) return () => void 0;

  if (!(element instanceof HTMLInputElement))
    throw new Error('the element must be an input');

  const completer = fixed ? '0' : '_';

  // Change keyboard type to mobile devices
  if (!element.hasAttribute('inputmode'))
    element.setAttribute('inputmode', 'numeric');

  const triggerInputChanges = (
    value: string,
    caret?: [start: number, end: number]
  ) => {
    element.value = value;
    element.dispatchEvent(new InputEvent('input'));
    setCaretPosition(caret);
    lastValue = value;
    afterFormat?.(value);
  };

  const firstPositionToNumber = prefix.length;
  const lengthUntilFirstThousandSeparator = 3 + decimalSeparator.length + fractionDigits;

  const addPrefixAndSuffix = (v: string) => `${prefix}${v}${suffix}`;
  const removePrefix = (v: Array<string>) => v.slice(prefix.length);
  const removeSuffix = (v: Array<string>) => v.slice(0, v.length - suffix.length);
  const fillDecimals = (v: string) => v.padStart(fractionDigits, completer);
  const getLastPositionToNumber = (v?: string) => v?.length ?? element.value.length - suffix.length;
  const caretIsOnPrefix = (n: number) => n < firstPositionToNumber;
  const caretIsOnSuffix = (n: number) => suffix.length > 0 && n > getLastPositionToNumber();

  const setCaretPosition = (force?: [start: number, end?: number]) => {
    const lastPositionToNumber = getLastPositionToNumber();
    const positionDefault = [lastPositionToNumber, lastPositionToNumber] as const;

    let position = positionDefault;

    if (cursor === 'move' && force)
      position = typeof force[1] === 'number' 
        ? [force[0], force[1]] as const
        : [force[0], force[0]] as const;

    element.setSelectionRange(...position);
    
    return position;
  };

  beforeFormat?.(element.value);

  const initialValue = formatToCurrency(element.value, currentConfiguration);

  let lastValue = initialValue;
  
  const onKeyDown = (e: KeyboardEvent) => {
    beforeFormat?.(element.value);
    const lastPositionToNumber = getLastPositionToNumber();
    
    let start = element.selectionStart ?? lastPositionToNumber;
    let end = element.selectionEnd ?? lastPositionToNumber;

    // Undo to first value
    if (e.ctrlKey && e.key === 'z') return triggerInputChanges(initialValue);
    
    // Allow move caret after or before the prefix or suffix
    if (cursor === 'move' && (
      (e.key === 'ArrowLeft' && start > firstPositionToNumber) ||
      (e.key === 'ArrowRight' && start < lastPositionToNumber)
    )) return; 

    // escrever logicva [pra n selecionar o CAD]
    e.preventDefault();

    // Select all
    if (e.ctrlKey && e.key === 'a') return setCaretPosition([firstPositionToNumber, lastPositionToNumber]);

    // Allow only number
    if (!allowedKeys.includes(e.key) && (e.key !== '-' || !allowNegative))
      return;

    if (caretIsOnPrefix(start)) [start, end] = setCaretPosition([firstPositionToNumber]);

    if (caretIsOnSuffix(start)) [start, end] = setCaretPosition([lastPositionToNumber]);

    // No allow erase the prefix
    if (e.key === 'Backspace' && start === 0) return;

    let characteres = element.value.split('');

    const length = Math.abs(end - start);
    const removeMoreThanOne = length > 0;

    // Define range that should remove
    const remove =
      removeMoreThanOne ? ([start, length] as const) : ([start - 1, 1] as const);

    // Define a range to add
    const add = [start, removeMoreThanOne ? length : 0, e.key] as const;

    // Add or remove characters
    characteres.splice(
      ...((e.key === 'Backspace' ? remove : add) as [number, number])
    );

    characteres = removeSuffix(removePrefix(characteres));

    while (
      characteres[0] === '0' ||
      characteres[0] === decimalSeparator ||
      characteres[0] === thousandsSeparator
    )
      characteres.shift();

    if (characteres.length <= fractionDigits)
      return triggerInputChanges(
        addPrefixAndSuffix(
          `${completer}${decimalSeparator}${fillDecimals(characteres.join(''))}`
        ), [start, end]
      );

    const result = [];

    let thousandsCounter = lengthUntilFirstThousandSeparator;

    for (let character; (character = characteres.pop()); ) {
      if (Number.isNaN(parseInt(character))) continue;
      thousandsCounter -= 1;

      if (thousandsCounter === 0) {
        result.unshift(thousandsSeparator);
        thousandsCounter = 3;
      }

      result.unshift(character);

      if (result.length !== fractionDigits) continue;

      result.unshift(decimalSeparator);
    }

    if (result.length === fractionDigits + decimalSeparator.length)
      result.unshift(completer);

    const newValue = addPrefixAndSuffix(result.join(''));

    if (e.key !== 'Backspace' && lastValue.length < newValue.length && start < getLastPositionToNumber(newValue)) {
      start += newValue.length - lastValue.length;
      end += newValue.length - lastValue.length;
    }
  
    triggerInputChanges(newValue, [start, end]);
  };

  const onSelectionChange = () => {
    if (document.activeElement !== element) return;

    const start = element.selectionStart;
    const end = element.selectionEnd;

    if (typeof start !== 'number' || typeof end !== 'number') return;

    let position: [start: number, end?: number] | undefined;

    const rangeStartOnPrefix = caretIsOnPrefix(start);
    const rangeStartOnSuffix = caretIsOnSuffix(end);

    const rangeEndOnSuffix = caretIsOnSuffix(start);
    const rangeEndOnPrefix = caretIsOnPrefix(end);

    if (rangeStartOnPrefix || rangeStartOnSuffix || rangeEndOnPrefix || rangeEndOnSuffix) position = [
      rangeStartOnPrefix ? firstPositionToNumber : (rangeStartOnSuffix ? getLastPositionToNumber() : start),
      rangeEndOnPrefix ? firstPositionToNumber : (rangeStartOnSuffix ? getLastPositionToNumber() : end),
    ];

    // Only set position if is on prefix or suffix
    if (!position) return;
    
    setCaretPosition(position);
  };

  element.addEventListener('keydown', onKeyDown);
  document.addEventListener('selectionchange', onSelectionChange);

  triggerInputChanges(initialValue);

  const removeMask = (): void => {
    element.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('selectionchange', onSelectionChange);
    delete (element as HTMLInputElementMasked).removeMask;
  };

  Object.defineProperty(element, 'removeMask', {
    value: removeMask,
    configurable: true,
    enumerable: true,
    writable: true,
  });

  return removeMask;
}

export default setMask;
/**
 * Check the {@link https://github.com/codermarcos/simple-mask-money/tree/main/examples/4.x.x#SimpleMaskMoney.setMask | SimpleMaskMoney.setMask} method to get more information about this type
 * 
 * @remarks
 * This type is part of the {@link https://github.com/codermarcos/simple-mask-money/ | SimpleMaskMoney} to see the full documentation check {@link https://github.com/codermarcos/simple-mask-money/tree/main/examples/4.x.x#SimpleMaskMoney.setMask | SimpleMaskMoney.setMask}
 */
export type SetMaskFunction = typeof setMask;

