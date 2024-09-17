import { useEffect } from "react";

const useHandlePosition = ({
  childRef,
  followCursor,
  gap,
  tooltipRef,
  position,
}: {
  childRef: React.MutableRefObject<HTMLDivElement | null>;
  tooltipRef: React.MutableRefObject<HTMLDivElement | null>;
  gap: number;
  followCursor?: boolean;
  position?: "top" | "bottom";
}) => {
  const FollowChildPos = (mousePageX: number, mousePageY: number) => {
    if (!childRef.current || !tooltipRef.current) {
      return;
    }

    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const screenHeight = window.innerHeight;
    const topPlusTT = childRect.top - tooltipRect.height - gap;
    const bottomPlusTT =
      screenHeight - childRect.bottom - tooltipRect.height - gap;
    const leftPlusTT =
      childRect.left - tooltipRect.width / 2 + childRect.width / 2;

    const compensateX = mousePageX - tooltipRect.width / 2;
    const compensateY = mousePageY - tooltipRect.height;

    //verify if it needs to update
    //if()
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
    const bottomPlusTT =
      screenHeight - childRect.bottom - tooltipRect.height - gap;
    const leftPlusTT =
      childRect.left - tooltipRect.width / 2 + childRect.width / 2;

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

  useEffect(() => {
    let mousePageX = 0;
    let mousePageY = 0;

    const mmove = (e: MouseEvent) => {
      mousePageX = e.pageX;
      mousePageY = e.pageY;
    };

    if (followCursor) {
      childRef.current?.addEventListener("mousemove", mmove);
    }

    const trackPosition = () => {
      FollowChildPos(mousePageX, mousePageY);
      return requestAnimationFrame(trackPosition); // Loop!
    };
    let af = trackPosition();

    return () => {
      cancelAnimationFrame(af);
      childRef.current?.removeEventListener("mousemove", mmove);
    };
  }, [tooltipRef.current, childRef.current]);
};

export default useHandlePosition;
