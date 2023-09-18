import type { OptionalSimpleMaskMoneyConfiguration } from 'src/types';

/**
 * It returns a the same function received but now It has default values for the configuration parameter. Allowing you to create instances of a function with different configurations without modifying the original function.
 * It takes two parameters some function of SimpleMaskMoney and configuration
 * 
 * @param {<P, R>(param: P, configuration?: OptionalSimpleMaskMoneyConfiguration) => R} fn - The first must be the function which you will use
 * @param {Partial<SimpleMaskMoneyConfiguration>} configuration - The second should be the configuration which you will use
 * @returns {<P, R>(param: P, configuration?: OptionalSimpleMaskMoneyConfiguration) => R} A new function to use with default values
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
 * 
 * @example
 * Here's an example using from npm with ESmodules:
 * ```javascript
 * import { createInstanceOf, setMask } from 'simple-mask-money';
 * const configuration = {
 *   // Your configuration here
 * };
 * const setMask = createInstanceOf(setMask, configuration);
 * const remove = setMask('#my-input'); // Now this method is with the same parameters passed before
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
/**
 * Check the {@link https://github.com/codermarcos/simple-mask-money/tree/main/examples/4.x.x#SimpleMaskMoney.createInstanceOf | SimpleMaskMoney.createInstanceOf} method to get more information about this type
 * 
 * @remarks
 * This type is part of the {@link https://github.com/codermarcos/simple-mask-money/ | SimpleMaskMoney} to see the full documentation check {@link https://github.com/codermarcos/simple-mask-money/tree/main/examples/4.x.x#SimpleMaskMoney.createInstanceOf | SimpleMaskMoney.createInstanceOf}
 * 
 */
export type CreateInstanceOfFunction = typeof createInstanceOf;
