import { useEffect, useRef } from 'react';

/**
 * Debounces given function
 * @param {Function} fn - function to debounce
 * @param {number} timeout - debounce timeout in milliseconds
 * @returns {Function} debounced function
 */
const useDebounce = (fn, timeout) => {
  const interval = useRef();
  const promise = useRef();

  const delay = (milliseconds) =>
    new Promise((resolve) => {
      interval.current = setTimeout(resolve, milliseconds);
    });

  const run = async (params) => {
    await delay(timeout);
    const result = await fn(params);
    return result;
  };

  const debounce = async (params) => {
    if (interval.current) clearInterval(interval.current);
    promise.current = run(params);
    let result;
    let current;
    do {
      current = promise.current;
      // eslint-disable-next-line no-await-in-loop
      result = await current;
    } while (current !== promise.current);
    return result;
  };

  useEffect(() => () => clearInterval(interval.current), [interval]);

  return debounce;
};

export default useDebounce;
