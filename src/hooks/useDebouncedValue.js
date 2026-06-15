/**
 * @file useDebouncedValue.js
 * @description Returns a debounced copy of `value` after `delay` ms of stability.
 *   Generic utility for search inputs and filter panels.
 *
 * @param {*} value — value to debounce
 * @param {number} [delay=300] — debounce interval in milliseconds
 */
import { useEffect, useState } from 'react';

export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
