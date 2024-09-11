import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export const ATWrapper = styled(motion.div)`
  position: fixed;
  right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  padding: 8px 14px;
  border-radius: 8px;
  pointer-events: auto;
  transition: all 0.14s;

  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);

  background-color: white;
`;

interface ATHOSToastProps {
  id: string;
  updateState: any;
  removeOnUpdateCondition?: boolean;
  renderCondition: boolean;
  children: React.ReactNode;
}

const ATHOSToast = ({
  id: ID,
  updateState,
  children,
  renderCondition,
  removeOnUpdateCondition,
}: ATHOSToastProps) => {
  const toasDftID = `athos-toast`;
  const toastID = `${ID}-${toasDftID}`;
  const [Root, setRoot] = useState<HTMLElement | null>(null);

  const verifyPos = (remove?: boolean) => {
    //select all that have toasDftID
    const toastElements = document.querySelectorAll(`[id*=${toasDftID}]`);
    console.log("toastElements", toastElements);
    //organize the toast elements in the screen
    let offset = 10;
    toastElements.forEach((element) => {
      if (remove && element.id == toastID) {
        return;
      }
      (element as HTMLElement).style.bottom = `${offset}px`;
      offset += element.clientHeight + 10;
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
          initial={{
            opacity: 0,
            transform: "translate3d(0, 100%, 0)",
          }}
          animate={{
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          }}
          exit={{
            opacity: 0,
            transform: "translate3d(0, 100%, 0)",
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
