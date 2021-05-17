import { useRef } from 'react';

export function useDebouce(fn: Function, delay: number) {
  let timeOutRef = useRef(0);
  function debounceFn(...args: any) {
    window.clearTimeout(timeOutRef.current);
    timeOutRef.current = window.setTimeout(() => fn(...args), delay);
  }

  return debounceFn;
}
