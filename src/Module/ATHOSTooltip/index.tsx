import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import { useHandlePosition_F } from "../hooks/private/useHandlePosition";
import useSetPortal from "../hooks/useSetPortal";
import { ATHOSTooltipProps } from "./interface";
import { ATTooltipWrapper } from "./styled";

export const ATHOSTooltip = (props: ATHOSTooltipProps) => {
  const { children, id = v4(), forceOpen, position = "top", followCursor, content } = props;
  const [open, setOpen] = useState(false);
  const [firstopen, setfirstOpen] = useState(true);
  const [Root, setRoot] = useState<HTMLElement | null>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const DftID = `athos-tooltip`;
  const ID = `${DftID} - ${id}`;
  const gap = 10;
  useSetPortal({
    portalId: ID,
    setRoot,
  });
  useHandlePosition_F({
    childRef,
    followCursor,
    gap,
    compRef: tooltipRef,
    position,
  });

  useEffect(() => {
    setTimeout(() => {
      setfirstOpen(false);
    }, 100);
  }, []);

  useEffect(() => {
    const setopen = (e: any) => {
      !e?.sourceCapabilities?.firesTouchEvents && setOpen(true);
    };
    const setclose = (e: any) => {
      !e?.sourceCapabilities?.firesTouchEvents && setOpen(false);
    };
    if (followCursor) {
      childRef.current?.addEventListener("mouseenter", setopen);
      childRef.current?.addEventListener("mouseleave", setclose);
    } else {
      childRef.current?.removeEventListener("mouseenter", setopen);
      childRef.current?.removeEventListener("mouseleave", setclose);
    }
    return () => {
      childRef.current?.removeEventListener("mouseenter", setopen);
      childRef.current?.removeEventListener("mouseleave", setclose);
    };
  }, []);

  return (
    <>
      {Root &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {(forceOpen || open || firstopen) && (
              <ATTooltipWrapper style={props.style} animate={{ opacity: firstopen ? 0 : 1 }} ref={tooltipRef}>
                {content}
              </ATTooltipWrapper>
            )}
          </AnimatePresence>,
          Root
        )}

      {children(childRef)}
    </>
  );
};

/* const handlePos = throttle(() => {
    //console.log("handlePos");
    const childRect = childRef.current!.getBoundingClientRect();
    const tooltipRect = tooltipRef.current!.getBoundingClientRect();
    //console.log("childRect", childRect);
    //console.log("tooltipRect", tooltipRect);
    const scrennWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const topPlusTT = childRect.top - tooltipRect.height - gap;
    const bottomPlusTT =
      screenHeight - childRect.bottom - tooltipRect.height - gap;
    
    //verify if it needs to update
    if()
    

    if (topPlusTT <= 0) {
      tooltipRef.current!.style.bottom = `${bottomPlusTT}px`;
    } else {
      tooltipRef.current!.style.top = `${topPlusTT}px`;
    }

    if (childRect.left + tooltipRect.width > scrennWidth) {
      tooltipRef.current!.style.right = `${scrennWidth - childRect.right}px`;
    } else {
      tooltipRef.current!.style.left = `${childRect.left}px`;
    }
  }, 5); */
