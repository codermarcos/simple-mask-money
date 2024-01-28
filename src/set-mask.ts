import type {
  HTMLInputElementMasked,
  OptionalSimpleMaskMoneyConfiguration,
} from 'src/types';

import getBaseConfiguration from 'src/get-base-configuration';

const numbers = '0123456789'.split('');

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
    negativeSignAfter,
    fractionDigits,
    decimalSeparator,
    thousandsSeparator,
    fixed,
    prefix,
    suffix,
    cursor,
    allowEmpty,
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
  const allowedKeys = [...numbers, 'Backspace', allowNegative ? '-' : ''];
  const lengthUntilFirstThousandSeparator = 3 + decimalSeparator.length + fractionDigits;

  const addPrefixAndSuffix = (v: string) => `${prefix}${v}${suffix}`;
  const getLastPositionToNumber = (v?: string) => v?.length ?? element.value.length - suffix.length;

  const caretIsOnPrefix = (n: number) => n < firstPositionToNumber;
  const caretIsOnSuffix = (n: number) => suffix.length > 0 && n > getLastPositionToNumber();

  const formatToMask = (v: Array<string>, trimExtraDecimals = false, action?: readonly [name: string, parmas: readonly [start: number, length: number, replace?: string]]) => {
    let actionName: string | undefined;
    const characteres = [...v];
    let result = new Array<string>();

    if (action) {
      [actionName] = action;
      const [, actionParams] = action;
      const [start, end] = actionParams;

      // Add or remove characters
      const characteresRemoved = characteres.splice(...(actionParams as [number, number]));

      // Backspace into decimal separator or thousands separator should remove next character
      if (actionName === 'remove' && characteresRemoved.length === 1) {
        const [removed] = characteresRemoved;
        if (removed === decimalSeparator || removed === thousandsSeparator)
          characteres.splice(start - 1, end);
      }
    }

    let thousandsCounter = lengthUntilFirstThousandSeparator;
    let decimalSeparatorAdded = false;
    let completersToRemove = 0;
    let isNegative = false;

    for (let character; (character = characteres.pop()); ) {
      if (character === '-') {
        isNegative = true;
        continue;
      }

      if (character === decimalSeparator && decimalSeparatorAdded && trimExtraDecimals) {
        const startAt = result.indexOf(decimalSeparator);
        result.splice(startAt, decimalSeparator.length);

        const fractionDigitsNumbers = result.slice(0, fractionDigits);

        if (fractionDigitsNumbers.length < result.length)
          thousandsCounter += result.length - fractionDigitsNumbers.length;

        result = [
          decimalSeparator,
          ...fractionDigitsNumbers,
        ];
        decimalSeparatorAdded = true;
        continue;
      }

      if (Number.isNaN(Number(character))) continue;

      thousandsCounter -= 1;

      if (character === completer)
        completersToRemove += 1;
      else if (character !== decimalSeparator && completersToRemove > 0)
        completersToRemove = 0;

      if (thousandsCounter === 0) {
        result.unshift(thousandsSeparator);
        thousandsCounter = 3;
      }

      result.unshift(character);

      if (result.length !== fractionDigits || decimalSeparatorAdded) continue;

      result.unshift(decimalSeparator);
      decimalSeparatorAdded = true;
    }

    if (completersToRemove !== 0)
      result.splice(0, completersToRemove);

    if (result.every(v => v === completer) && actionName === 'remove')
      isNegative = false;

    if (result.length <= fractionDigits)
      result = [completer, decimalSeparator, result.join('').padStart(fractionDigits, completer)];
    else if (result.length === fractionDigits + decimalSeparator.length) // ,00
      result.unshift(completer);

    if (isNegative)
      result[negativeSignAfter ? 'push' : 'unshift']('-');

    return addPrefixAndSuffix(result.join(''));
  };

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

  const initialValue = formatToMask(element.value.split(''), true);

  let lastValue = initialValue;

  const onKeyDown = (e: KeyboardEvent) => {
    beforeFormat?.(element.value);
    const lastPositionToNumber = getLastPositionToNumber();

    let start = element.selectionStart ?? lastPositionToNumber;
    let end = element.selectionEnd ?? lastPositionToNumber;

    // Select all
    if (e.ctrlKey && e.key === 'a') return setCaretPosition([firstPositionToNumber, lastPositionToNumber]);

    // Undo to first value
    if (e.ctrlKey && e.key === 'z') return triggerInputChanges(initialValue);

    // Allow move caret after or before the prefix or suffix
    if (cursor === 'move' && (
      (e.key === 'ArrowLeft' && start > firstPositionToNumber) ||
      (e.key === 'ArrowRight' && start < lastPositionToNumber)
    )) return;

    e.preventDefault();

    // Select all
    if (e.ctrlKey && e.key === 'a') return setCaretPosition([firstPositionToNumber, lastPositionToNumber]);

    // Allow only number
    if (!allowedKeys.includes(e.key)) return;

    const isBackspace = e.key === 'Backspace';

    if (caretIsOnPrefix(start)) [start, end] = setCaretPosition([firstPositionToNumber]);

    if (caretIsOnSuffix(start)) [start, end] = setCaretPosition([lastPositionToNumber]);

    // No allow erase the prefix
    if (isBackspace && start === 0) return;

    if (allowEmpty && isBackspace && element.value.length <= prefix.length + 1) {
      triggerInputChanges(prefix);
      return;
    }

    const characteres = element.value.split('');

    const length = Math.abs(end - start);
    const removeMoreThanOne = length > 0;

    // Define range that should remove
    const remove =
      removeMoreThanOne ? ([start, length] as const) : ([start - 1, 1] as const);

    // Define a range to add
    const add = [start, removeMoreThanOne ? length : 0, e.key] as const;

    const action = isBackspace ? 'remove' : 'add';

    const newValue = formatToMask(characteres, false, [action, ({ add, remove })[action]]);

    if (!isBackspace && lastValue.length < newValue.length && start < getLastPositionToNumber(newValue)) {
      start += newValue.length - lastValue.length;
      end += newValue.length - lastValue.length;
    } else if (isBackspace && lastValue.length > newValue.length && start > firstPositionToNumber) {
      const characteresRemoved = lastValue.length - newValue.length;
      start = start - characteresRemoved <= firstPositionToNumber ? firstPositionToNumber : start - characteresRemoved;
      end = end - characteresRemoved <= firstPositionToNumber ? firstPositionToNumber : end - characteresRemoved;
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

  if (allowEmpty && initialValue === `${prefix}0`) {
    triggerInputChanges('');
  } else {
    triggerInputChanges(initialValue);
  }
  
  if (element.hasAttribute('readonly') || element.hasAttribute('disabled')) return () => void 0;

  element.addEventListener('keydown', onKeyDown);
  document.addEventListener('selectionchange', onSelectionChange);

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

