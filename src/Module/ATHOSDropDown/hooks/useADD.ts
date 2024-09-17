import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

import useSetPortal from "../../hooks/useSetPortal";
import { ChildSize } from "../../interfaces/interfaces";
import useADDAdjustPos from "./useADDAdjustPos";

const useADD = ({
  positionVert,
  positionHor,
  id,
  close,
  setDropdownRoot,
}: {
  positionVert: "top" | "bottom" | undefined;
  positionHor: "left" | "right" | undefined;
  id: string;
  close: () => void;
  setDropdownRoot: (root: HTMLElement | null) => void;
}) => {
  const [childSize, setChildSize] = useState<ChildSize>();
  const childRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const DDid = `${id}-ATHOSDropDown`;
  const gap = 10;

  useADDAdjustPos(childRef, positionVert, positionHor, gap, setChildSize);
  useSetPortal(DDid, setDropdownRoot);
  /* [containerRef, childRef], close */
  useClickOutside({
    callback: close,
    refs: [containerRef, childRef],
  });

  return { childRef, containerRef, childSize };
};

export default useADD;
