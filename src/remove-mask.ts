import type { HTMLInputElementMasked } from './types';

/**
 * Removes the mask from an input element.
 *
 * @param input - The input element or selector string.
 * @returns A function that removes the mask from the input element or all inputs.
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
