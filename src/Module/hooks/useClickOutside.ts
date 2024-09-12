import { RefObject, useEffect } from "react";

/**
 * Custom hook that detects clicks outside of a set of specified elements.
 *
 * @param refs - An array of React ref objects representing the elements to detect clicks outside of.
 * @param callback - A callback function to be executed when a click outside is detected.
 */
export const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    if (refs.some((ref) => ref.current?.contains(e.target as Node))) {
      return;
    }
    callback();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
};
