import { useEffect } from "react";
import { ChildSize } from "../../interfaces/interfaces";

const useADDAdjustPos = (
  childRef: React.MutableRefObject<HTMLDivElement | null>,
  positionVert: "top" | "bottom" | undefined,
  positionHor: "left" | "right" | undefined,
  gap: number,
  setChildSize: React.Dispatch<React.SetStateAction<ChildSize | undefined>>
) => {
  useEffect(() => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      const scrennWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      //console.log(rect);
      let csize: ChildSize = {};

      if (positionVert) {
        switch (positionVert) {
          case "top":
            csize.bottom =
              (screenHeight - rect.top + gap) * (csize.right === 0 ? -1 : 1);
            break;
          case "bottom":
            csize.top = 0;
            break;
          default:
            break;
        }
      }
      if (positionHor) {
        switch (positionHor) {
          case "left":
            csize.right =
              (scrennWidth - rect.right) * (csize.bottom === 0 ? -1 : 1);
            break;
          case "right":
            csize.left = 0;
            break;
          default:
            break;
        }
      }
      const w = (scrennWidth - rect.right) * (csize.bottom === 0 ? -1 : 1);
      const h = (screenHeight - rect.top + gap) * (csize.right === 0 ? -1 : 1);
      csize.transform = `translate3d(${w}px, ${h}px, 0)`;
      setChildSize(csize);
    }
  }, [childRef.current]);
};

export default useADDAdjustPos;
