import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export const ATWrapper = styled(motion.div)`
  position: fixed;
  pointer-events: auto;
  transition: all 0.14s;
`;

interface ATHOSToastProps {
  id: string;
  updateState: any;
  removeCondition?: boolean;
  renderCondition: boolean;
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  gap?: number;
}

const ATHOSToast = ({
  id: ID,
  updateState,
  children,
  renderCondition,
  removeCondition: removeOnUpdateCondition,
  position = "top-right",
  gap = 5,
}: ATHOSToastProps) => {
  const toasDftID = `athos-toast`;
  const toastID = `${ID}-${toasDftID}`;
  const [Root, setRoot] = useState<HTMLElement | null>(null);

  const verifyPos = (remove?: boolean) => {
    //select all that have toasDftID
    const toastElements = document.querySelectorAll(`[id*=${toasDftID}]`);
    //organize the toast elements in the screen
    let offset = 10;
    toastElements.forEach((element) => {
      if (remove && element.id == toastID) {
        return;
      }
      if (position.includes("top")) {
        (element as HTMLElement).style.top = `${offset}px`;
      } else {
        (element as HTMLElement).style.bottom = `${offset}px`;
      }
      offset += element.clientHeight + gap;
    });
  };

  useEffect(() => {
    verifyPos(removeOnUpdateCondition);
  }, [updateState]);

  useEffect(() => {
    const Root = document.createElement("div");
    Root.id = toastID; // Set the id to ATHOSDropDown

    // Append the div to the root of the document
    document.body.appendChild(Root);

    // Set it to state so we can use it for rendering the dropdown
    setRoot(Root);

    // Cleanup function to remove the div when the component unmounts
    return () => {
      Root.remove();
    };
  }, []);

  // If dropdownRoot is null, don't render anything yet
  if (!Root) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {renderCondition && (
        <ATWrapper
          style={{
            right: position.includes("right") ? gap * 2 : undefined,
            left: position.includes("left") ? gap * 2 : undefined,
          }}
          initial={{
            opacity: 0,
            transform: `translate3d(0, ${
              position.includes("top") ? -100 : 100
            }%, 0)`,
          }}
          animate={{
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          }}
          exit={{
            opacity: 0,
            transform: `translate3d(0, ${
              position.includes("top") ? -100 : 100
            }%, 0)`,
          }}
          id={toastID}
        >
          {children}
        </ATWrapper>
      )}
    </AnimatePresence>,
    Root
  );
};

export default ATHOSToast;
