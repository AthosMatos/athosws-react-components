import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";
import { useClickOutside } from "../useClickOutside";

export type PopUpPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "left-top"
  | "left-bottom"
  | "right"
  | "right-top"
  | "right-bottom";

interface IusePopUp {
  position?: PopUpPosition;
  matchChildrenWidth?: boolean;
  spacing?: number;
  onToggle?: (isOpen: boolean) => void;
}

export const usePopUp = ({ position = "top", matchChildrenWidth = false, spacing = 6, onToggle }: IusePopUp) => {
  const id = useMemo(() => v4(), []);
  const [isOpened, setIsOpened] = useState(false);
  const pos =
    position === "top"
      ? "dropdown-top dropdown-center"
      : position === "top-left"
      ? "dropdown-top"
      : position === "top-right"
      ? "dropdown-top dropdown-end"
      : position === "bottom"
      ? "dropdown-bottom dropdown-center"
      : position === "bottom-left"
      ? "dropdown-bottom"
      : position === "bottom-right"
      ? "dropdown-bottom dropdown-end"
      : position === "left"
      ? "dropdown-left dropdown-center"
      : position === "left-top"
      ? "dropdown-left"
      : position === "left-bottom"
      ? "dropdown-left dropdown-end"
      : position === "right"
      ? "dropdown-right dropdown-center"
      : position === "right-top"
      ? "dropdown-right"
      : position === "right-bottom"
      ? "dropdown-right dropdown-end"
      : "dropdown-top dropdown-center";

  const gap = useMemo(
    () =>
      position.startsWith("top")
        ? { marginBottom: `${spacing}px` }
        : position.startsWith("bottom")
        ? { marginTop: `${spacing}px` }
        : position.startsWith("left")
        ? { marginRight: `${spacing}px` }
        : { marginLeft: `${spacing}px` },
    [spacing, position]
  );
  const childRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);
  useLayoutEffect(() => {
    if (childRef.current && matchChildrenWidth) {
      const childWidth = childRef.current.getBoundingClientRect().width;
      const dropdown = document.getElementById(id);

      if (dropdown) {
        dropdown.style.width = `${childWidth}px`;
      }
    }
  }, [childRef.current, matchChildrenWidth, isOpened]);

  useClickOutside({
    callback: () => {
      setIsOpened(false);
    },
    refs: [childRef, contentRef],
  });

  useEffect(() => {
    onToggle && onToggle(isOpened);
  }, [isOpened]);
  return { id, pos, gap, childRef, contentRef, setIsOpened, isOpened };
};
