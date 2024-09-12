import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ChildSize } from "../interfaces";
import useADDAdjustPos from "./useADDAdjustPos";
import useADDSetPortal from "./useADDSetPortal";

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
  useADDSetPortal(DDid, setDropdownRoot);
  useClickOutside([containerRef, childRef], close);

  return { childRef, containerRef, childSize };
};

export default useADD;
