import { useEffect, useRef, useState } from "react";
import { ATHOSTooltipProps } from "./interface";
import { ATTooltipWrapper } from "./styled";

export const ATHOSTooltip = (props: ATHOSTooltipProps) => {
  const { children, forceOpen, position = "top", followCursor, tooltipContent, gap = 2, className, style } = props;
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const FollowChildPos = (mousePageX: number, mousePageY: number) => {
    if (!childRef.current || !tooltipRef.current) {
      return;
    }

    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const screenHeight = window.innerHeight;
    const topPlusTT = childRect.top - tooltipRect.height - gap;
    const bottomPlusTT = screenHeight - childRect.bottom - tooltipRect.height - gap;
    const leftPlusTT = childRect.left - tooltipRect.width / 2 + childRect.width / 2;

    const compensateX = mousePageX - tooltipRect.width / 2;
    const compensateY = mousePageY - tooltipRect.height + gap;

    if (followCursor) {
      if (compensateY > 0) tooltipRef.current.style.top = `${compensateY}px`;
      if (compensateX > 0) tooltipRef.current.style.left = `${compensateX}px`;
    } else {
      if (position) {
        switch (position) {
          case "top":
            tooltipRef.current.style.top = `${topPlusTT}px`;
            break;
          case "bottom":
            tooltipRef.current.style.bottom = `${bottomPlusTT}px`;
            break;
        }
      } else {
        if (topPlusTT <= 0) {
          tooltipRef.current.style.bottom = `${bottomPlusTT}px`;
        } else {
          tooltipRef.current.style.top = `${topPlusTT}px`;
        }
      }

      if (leftPlusTT <= 0) {
        tooltipRef.current.style.left = `0px`;
      } else {
        tooltipRef.current.style.left = `${leftPlusTT}px`;
      }
    }
  };

  const InitFollowChildPos = () => {
    if (!childRef.current || !tooltipRef.current) {
      return;
    }

    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const screenHeight = window.innerHeight;
    const topPlusTT = childRect.top - tooltipRect.height - gap;
    const bottomPlusTT = screenHeight - childRect.bottom - tooltipRect.height - gap;
    const leftPlusTT = childRect.left - tooltipRect.width / 2 + childRect.width / 2;

    if (position) {
      switch (position) {
        case "top":
          tooltipRef.current.style.top = `${topPlusTT}px`;
          break;
        case "bottom":
          tooltipRef.current.style.bottom = `${bottomPlusTT}px`;
          break;
      }
    } else {
      if (topPlusTT <= 0) {
        tooltipRef.current.style.bottom = `${bottomPlusTT}px`;
      } else {
        tooltipRef.current.style.top = `${topPlusTT}px`;
      }
    }
    if (leftPlusTT <= 0) {
      tooltipRef.current.style.left = `0px`;
    } else {
      tooltipRef.current.style.left = `${leftPlusTT}px`;
    }
  };

  useEffect(() => {
    InitFollowChildPos();
  }, [tooltipRef.current, childRef.current]);

  return (
    <>
      {(forceOpen || open) && (
        <ATTooltipWrapper
          initial={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
          /* exit={{ opacity: 0 }} */
          animate={{ opacity: 1 }}
          ref={tooltipRef}
          className={className}
          style={style}
        >
          {tooltipContent}
        </ATTooltipWrapper>
      )}

      <div
        ref={childRef}
        onMouseMove={(e) => {
          if (followCursor && tooltipRef.current) {
            const { clientX: mouseX, clientY: mouseY } = e;
            FollowChildPos(mouseX, mouseY);
          }
        }}
        // className="cursor-zoom-in"
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onMouseOut={() => setOpen(false)}
      >
        {children}
      </div>
    </>
  );
};
