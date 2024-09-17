import { RefObject, useEffect } from "react";

/**
 * Custom hook that detects clicks outside of a set of specified elements.
 *
 * @param ids - An array of strings representing the ids of the elements to detect clicks outside of.
 * @param refs - An array of React ref objects representing the elements to detect clicks outside of.
 * @param callback - A callback function to be executed when a click outside is detected.
 */

interface ClickOutsideBaseProps {
  callback: () => void;
}

interface ClickOutsideRefProps extends ClickOutsideBaseProps {
  refs: RefObject<HTMLElement>[];
}

interface ClickOutsideIdProps extends ClickOutsideBaseProps {
  ids: string[];
}

type ClickOutsideProps = ClickOutsideRefProps | ClickOutsideIdProps;

export const useClickOutside = (props: ClickOutsideProps) => {
  const { callback } = props;

  let refs: RefObject<HTMLElement>[] = [];

  if ("refs" in props) {
    refs = props.refs;
  } else {
    refs = props.ids.map((id) => {
      const ref = { current: document.getElementById(id) };
      return ref;
    });
  }

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
