import { useEffect, RefObject } from 'react';

type AnyEvent = MouseEvent | TouchEvent;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (evt: AnyEvent) => void
): void {
  useEffect(() => {
    const listener = (evt: AnyEvent) => {
      const el = ref?.current;
      if (!el || el.contains(evt.target as Node)) {
        return;
      }
      handler(evt);
    };

    document.addEventListener(`click`, listener);

    return () => {
      document.removeEventListener(`click`, listener);
    };
  }, [ref, handler]);
}
