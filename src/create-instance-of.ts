import type { OptionalSimpleMaskMoneyConfiguration } from 'src/types';

/**
 * Will return the same function with default values.
 *
 * @param value - The first must be the function which you will use
 * @param configuration - The second should be the configuration which you will use
 * @returns A new function to use with default values
 * 
 * @example
 * Here's an example using from cdn with Vanilla JS:
 * ```html
 * <script src=""></script>
 * 
 * <input id="my-input" />
 * 
 * <script>
 *   const { createInstanceOf, setMask } = SimpleMaskMoney;
 *   const configuration = {
 *     // Your configuration here
 *   };
 *   const setMask = createInstanceOf(setMask, configuration);
 *   const remove = setMask('#my-input'); // Now this method is with the same parameters passed before
 * </script>
 * ```
 */
function createInstanceOf<P, R>(
  fn: (param: P, configuration?: OptionalSimpleMaskMoneyConfiguration) => R,
  configuration: OptionalSimpleMaskMoneyConfiguration,
) {
  const instanceOf = (
    param: P,
    overwritedConfiguration?: OptionalSimpleMaskMoneyConfiguration,
  ) => fn(param, overwritedConfiguration ?? configuration) as R;

  return instanceOf as typeof fn;
}

export default createInstanceOf;
