import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ATHOSDropDownProps, ChildSize } from "./interfaces";
import { ADDChildWrapper, ADDContainer, ADDLabel } from "./styled";

const ATHOSDropDown = ({
  children,
  open,
  positionVert,
  positionHor,
  id,
  labels,
  close,
}: ATHOSDropDownProps) => {
  const [childSize, setChildSize] = useState<ChildSize>();
  const childRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    //if click is outside the container, close the dropdown
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        childRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !childRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
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
              ref={containerRef}
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
                {labels.map((label) => (
                  <ADDLabel onClick={label.onClick}>{label.label}</ADDLabel>
                ))}
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
