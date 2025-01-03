import { AnimatePresence } from "framer-motion";
import { memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import useSetPortal from "../hooks/useSetPortal";
import { ATHOSToastProps } from "./interfaces";
import { ATWrapper } from "./styled";

const ATHOSToast = memo(
  ({
    id = v4(),
    updateState,
    children,
    renderCondition,
    removeCondition: removeOnUpdateCondition,
    position = "top-right",
    gap = 5,
  }: ATHOSToastProps) => {
    const toasDftID = `athos-toast`;
    const toastID = `${id}-${toasDftID}`;
    const [Root, setRoot] = useState<HTMLElement | null>(null);
    useSetPortal({
      portalId: toasDftID + id,
      setRoot,
    });

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
    }, [updateState, renderCondition]);

    return (
      Root &&
      ReactDOM.createPortal(
        <AnimatePresence>
          {renderCondition && (
            <ATWrapper
              style={{
                right: position.includes("right") ? gap * 2 : undefined,
                left: position.includes("left") ? gap * 2 : undefined,
              }}
              initial={{
                opacity: 0,
                transform: `translate3d(0, ${position.includes("top") ? -100 : 100}%, 0)`,
              }}
              animate={{
                opacity: 1,
                transform: "translate3d(0, 0, 0)",
              }}
              exit={{
                opacity: 0,
                transform: `translate3d(0, ${position.includes("top") ? -100 : 100}%, 0)`,
              }}
              id={toastID}
            >
              {children}
            </ATWrapper>
          )}
        </AnimatePresence>,
        Root
      )
    );
  }
);

export { ATHOSToast };
