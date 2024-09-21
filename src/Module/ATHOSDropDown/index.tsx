import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import { useHandlePosition_NF } from "../hooks/private/useHandlePosition";
import { useClickOutside } from "../hooks/useClickOutside";
import useSetPortal from "../hooks/useSetPortal";
import { ATHOSDropDownProps } from "./interfaces";
import { ADDLabel, ADDWrapper } from "./styled";

/**
 *
 */

const ATHOSDropDown = ({
  children,
  isOpen,
  onClose,
  position = "top",
  id = v4(),
  labels,
  style,
}: ATHOSDropDownProps) => {
  const [Root, setRoot] = useState<HTMLElement | null>(null);
  const [firstopen, setfirstOpen] = useState(true);
  const childRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const DftID = `athos-dropdown`;
  const ID = `${DftID} - ${id}`;
  const gap = 10;
  useEffect(() => {
    setTimeout(() => {
      setfirstOpen(false);
    }, 100);
  }, []);
  useSetPortal({
    portalId: ID,
    setRoot,
    onUnmount: onClose,
  });
  useHandlePosition_NF({
    childRef,
    gap,
    compRef: dropdownRef,
    position,
  });
  useClickOutside({
    callback: onClose,
    refs: [childRef, dropdownRef],
  });
  return (
    <>
      {Root &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {(isOpen || firstopen) && (
              <ADDWrapper
                ref={dropdownRef}
                style={style}
                animate={{ opacity: firstopen ? 0 : 1 }}
              >
                {labels.map((label) => (
                  <ADDLabel onClick={label.onClick}>{label.label}</ADDLabel>
                ))}
              </ADDWrapper>
            )}
          </AnimatePresence>,
          Root
        )}

      {children(childRef)}
    </>
  );
};

export { ATHOSDropDown };
