import { AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { v4 } from "uuid";
import { ATHOSToastProps } from "./interfaces";
import { ATWrapper } from "./styled";

const Toast = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`${className} bg-white z-50 dark:bg-black rounded-md p-4 shadow-md text-black dark:text-white`}>{children}</div>;
};

export const ATHOSToast = (props: ATHOSToastProps) => {
  const {
    id = v4(),
    updateState,
    children,
    renderCondition,
    removeCondition: removeOnUpdateCondition,
    position = "top-right",
    gap = 5,
    renderAndFade,
    className,
  } = props;
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (renderAndFade) {
      setTimeout(() => {
        setHide(true);
      }, 3000);
    }
  }, [renderAndFade]);
  const toasDftID = `athos-toast`;
  const toastID = `${id}-${toasDftID}`;

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
    <AnimatePresence>
      {renderCondition && !hide && (
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
          {typeof children === "string" ? <Toast className={className}>{children}</Toast> : children}
        </ATWrapper>
      )}
    </AnimatePresence>
  );
};
