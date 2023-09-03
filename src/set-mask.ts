import type {
  SimpleMaskMoneyConfiguration,
  HTMLInputElementMasked,
} from 'src/types';

import getBaseConfiguration from 'src/get-base-configuration';
import formatToCurrency from 'src/format-to-currency';

const activeListeners = new Array<() => void>();

const arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
const allowedKeys = [...Array(10).keys(), 'Backspace'].map((n) => n.toString());

/**
 * Returns the formated input.
 *
 * @param input - The first can be a QueryCSSSelectorString or an Input
 * @param configuration - The second is the configuration
 * @returns The a method to clear the input mask
 *
 *
 * @throws {@link}
 * This exception is thrown if the element is not an input.
 */
function setMask(
  input: HTMLInputElementMasked | HTMLInputElement | string | null,
  configuration?: Partial<SimpleMaskMoneyConfiguration>
) {
  const currentConfiguration = getBaseConfiguration(configuration);

  const {
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

  const setCaretPosition = () => {
    const position =
      cursor === 'end'
        ? ([
          element.value.length - suffix.length,
          element.value.length - suffix.length,
        ] as const)
        : ([0, 0] as const);
    element.focus();
    element.setSelectionRange(...position);
  };

  const triggerInputChanges = (value: string) => {
    element.value = value;
    element.dispatchEvent(new InputEvent('input'));
    if (cursor === 'end') setCaretPosition();
  };

  const initialValue = formatToCurrency(element.value, currentConfiguration);

  const removePrefix = (v: Array<string>) => v.slice(prefix.length);
  const removeSuffix = (v: Array<string>) =>
    v.slice(0, v.length - suffix.length);
  const addPrefixAndSuffix = (v: string) => `${prefix}${v}${suffix}`;
  const fillDecimals = (v: string) => v.padStart(fractionDigits, completer);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'z') return triggerInputChanges(initialValue);

    if (cursor === 'move' && arrows.includes(e.key)) return;

    e.preventDefault();

    // Allow only number
    if (!allowedKeys.includes(e.key) && (e.key !== '-' || !allowNegative))
      return;

    const start = element.selectionStart ?? 0;

    // No allow erase the prefix
    if ((e.key === 'Backspace' && start === 0) || start < prefix.length) return;

    // No allow erase the suffix
    if (
      e.key === 'Backspace' &&
      suffix.length > 0 &&
      start > element.value.length - suffix.length
    )
      return;

    let characteres = element.value.split('');

    const end = element.selectionEnd ?? 0;
    const length = Math.abs(end - start);

    // Define range that should remove
    const remove =
      length === 0 ? ([start - 1, 1] as const) : ([start, length] as const);

    // Define a range to add
    const add = [start, 0, e.key] as const;

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
        )
      );

    const result = [];

    let thousandsCounter = 3 + decimalSeparator.length + fractionDigits;

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

    triggerInputChanges(addPrefixAndSuffix(result.join('')));
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    setCaretPosition();
  };

  element.addEventListener('keydown', onKeyDown);

  if (cursor !== 'move') element.addEventListener('click', onClick);

  triggerInputChanges(initialValue);

  const removeMask = (): void => {
    if (cursor !== 'move') element.removeEventListener('click', onClick);
    element.removeEventListener('keydown', onKeyDown);
    delete (element as HTMLInputElementMasked).removeMask;
  };

  Object.defineProperty(element, 'removeMask', {
    value: removeMask,
    configurable: true,
    writable: true,
  });

  activeListeners.push(removeMask);

  return removeMask;
}

/**
 * Removes the mask from an input element.
 *
 * @param input - The input element or selector string.
 * @returns A function that removes the mask from the input element or all inputs.
 */

export function removeMask(
  input?: HTMLInputElementMasked | HTMLInputElement | string | null
): () => void {
  if (typeof document === 'undefined') return () => void 0;

  const element =
    typeof input === 'string' ? document.querySelector(input) : input ?? null;

  if (element === null) return () => void 0;

  if (!(element instanceof HTMLInputElement))
    throw new Error('the element must be an input');

  return () => {
    if ('removeMask' in element && typeof element.removeMask === 'function')
      return element.removeMask();

    for (let remove; (remove = activeListeners.pop()); ) remove();
  };
}

export default setMask;
