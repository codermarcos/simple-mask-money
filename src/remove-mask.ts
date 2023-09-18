import type { HTMLInputElementMasked } from './types';

/**
 * It removes a mask from an input element. 
 * It takes an input element or selector string as a parameter and returns a function that removes the mask from the input element or all inputs.
 *
 * @param {HTMLInputElementMasked | HTMLInputElement | string | null} input - The input element or selector string.
 * @returns {() => void} A function that removes the mask from the input element.
 */
function removeMask(
  input: HTMLInputElementMasked | HTMLInputElement | string | null
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
  };
}


export default removeMask;
/**
 * Check the {@link https://github.com/codermarcos/simple-mask-money/tree/main/examples/4.x.x#SimpleMaskMoney.removeMask | SimpleMaskMoney.removeMask} method to get more information about this type
 * 
 * @remarks
 * This type is part of the {@link https://github.com/codermarcos/simple-mask-money/ | SimpleMaskMoney} to see the full documentation check {@link https://github.com/codermarcos/simple-mask-money/tree/main/examples/4.x.x#SimpleMaskMoney.removeMask | SimpleMaskMoney.removeMask}
 * 
 */
export type RemoveMaskFunction = typeof removeMask;
