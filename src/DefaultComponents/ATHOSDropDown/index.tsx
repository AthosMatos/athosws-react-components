import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ATHOSDropDownProps {
  children: (ref: any) => React.ReactNode;
  open: boolean;
  positionVert?: "top" | "bottom";
  positionHor?: "left" | "right";
  id: string;
}
type ChildSize = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  transform?: string;
};

type ADDContainerProps = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  transform?: string;
};
const ADDContainer = styled(motion.div)<ADDContainerProps>`
  position: fixed;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  opacity: ${({ opacity }) => opacity};
  transform: ${({ transform }) => transform};
  will-change: transform;
  background-color: red;

  z-index: 9999;
`;

const ADDChildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: max-content;
`;

const ATHOSDropDown = ({
  children,
  open,
  positionVert,
  positionHor,
  id,
}: ATHOSDropDownProps) => {
  const [childSize, setChildSize] = useState<ChildSize>();
  const childRef = useRef<HTMLDivElement>(null);
  const DDid = `${id}-ATHOSDropDown`;
  const gap = 10;
  const [dropdownRoot, setDropdownRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      const scrennWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let csize: ChildSize = {};

      if (positionVert) {
        switch (positionVert) {
          case "top":
            csize.bottom = 0;
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
            csize.right = 0;
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

  useEffect(() => {
    const dropDownRoot = document.createElement("div");
    dropDownRoot.id = DDid; // Set the id to ATHOSDropDown

    // Append the div to the root of the document
    document.body.appendChild(dropDownRoot);

    // Set it to state so we can use it for rendering the dropdown
    setDropdownRoot(dropDownRoot);

    // Cleanup function to remove the div when the component unmounts
    return () => {
      dropDownRoot.remove();
    };
  }, []);

  // If dropdownRoot is null, don't render anything yet
  if (!dropdownRoot) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {open && (
            <ADDContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              top={childSize?.top}
              left={childSize?.left}
              right={childSize?.right}
              bottom={childSize?.bottom}
              transform={childSize?.transform}
            >
              <ADDChildWrapper>
                <label>Secondary Func</label>
                <label>Secondary Func</label>
                <label>Secondary Func</label>
              </ADDChildWrapper>
            </ADDContainer>
          )}
        </AnimatePresence>,
        dropdownRoot
      )}
      {children(childRef)}
    </>
  );
};

export default ATHOSDropDown;
