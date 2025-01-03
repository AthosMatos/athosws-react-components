import { useEffect } from "react";

export const useHandlePosition_F = ({
  childRef,
  followCursor,
  gap,
  compRef,
  position,
}: {
  childRef: React.MutableRefObject<HTMLDivElement | null>;
  compRef: React.MutableRefObject<HTMLDivElement | null>;
  gap: number;
  followCursor?: boolean;
  position?: "top" | "bottom";
}) => {
  const FollowChildPos = (mousePageX: number, mousePageY: number) => {
    if (!childRef.current || !compRef.current) {
      return;
    }

    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = compRef.current.getBoundingClientRect();

    const screenHeight = window.innerHeight;
    const topPlusTT = childRect.top - tooltipRect.height - gap;
    const bottomPlusTT = screenHeight - childRect.bottom - tooltipRect.height - gap;
    const leftPlusTT = childRect.left - tooltipRect.width / 2 + childRect.width / 2;

    const compensateX = mousePageX - tooltipRect.width / 2;
    const compensateY = mousePageY - tooltipRect.height + gap;

    if (followCursor) {
      if (compensateY > 0) compRef.current.style.top = `${compensateY}px`;
      if (compensateX > 0) compRef.current.style.left = `${compensateX}px`;
    } else {
      if (position) {
        switch (position) {
          case "top":
            compRef.current.style.top = `${topPlusTT}px`;
            break;
          case "bottom":
            compRef.current.style.bottom = `${bottomPlusTT}px`;
            break;
        }
      } else {
        if (topPlusTT <= 0) {
          compRef.current.style.bottom = `${bottomPlusTT}px`;
        } else {
          compRef.current.style.top = `${topPlusTT}px`;
        }
      }

      if (leftPlusTT <= 0) {
        compRef.current.style.left = `0px`;
      } else {
        compRef.current.style.left = `${leftPlusTT}px`;
      }
    }
  };

  const InitFollowChildPos = () => {
    if (!childRef.current || !compRef.current) {
      return;
    }

    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = compRef.current.getBoundingClientRect();

    const screenHeight = window.innerHeight;
    const topPlusTT = childRect.top - tooltipRect.height - gap;
    const bottomPlusTT = screenHeight - childRect.bottom - tooltipRect.height - gap;
    const leftPlusTT = childRect.left - tooltipRect.width / 2 + childRect.width / 2;

    if (position) {
      switch (position) {
        case "top":
          compRef.current.style.top = `${topPlusTT}px`;
          break;
        case "bottom":
          compRef.current.style.bottom = `${bottomPlusTT}px`;
          break;
      }
    } else {
      if (topPlusTT <= 0) {
        compRef.current.style.bottom = `${bottomPlusTT}px`;
      } else {
        compRef.current.style.top = `${topPlusTT}px`;
      }
    }
    if (leftPlusTT <= 0) {
      compRef.current.style.left = `0px`;
    } else {
      compRef.current.style.left = `${leftPlusTT}px`;
    }
  };

  useEffect(() => {
    InitFollowChildPos();
  }, [compRef.current, childRef.current]);

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
  }, [compRef.current, childRef.current]);
};

export const useHandlePosition_NF = ({
  childRef,
  gap,
  compRef,
  position,
}: {
  childRef: React.MutableRefObject<HTMLDivElement | null>;
  compRef: React.MutableRefObject<HTMLDivElement | null>;
  gap: number;
  position?: "top" | "bottom";
}) => {
  const FollowChildPos = () => {
    if (!childRef.current || !compRef.current) {
      return;
    }

    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = compRef.current.getBoundingClientRect();

    const screenHeight = window.innerHeight;
    const topPlusTT = childRect.top - tooltipRect.height - gap;
    const bottomPlusTT = screenHeight - childRect.bottom - tooltipRect.height - gap;
    const leftPlusTT = childRect.left - tooltipRect.width / 2 + childRect.width / 2;

    if (position) {
      switch (position) {
        case "top":
          compRef.current.style.top = `${topPlusTT}px`;
          break;
        case "bottom":
          compRef.current.style.bottom = `${bottomPlusTT}px`;
          break;
      }
    } else {
      if (topPlusTT <= 0) {
        compRef.current.style.bottom = `${bottomPlusTT}px`;
      } else {
        compRef.current.style.top = `${topPlusTT}px`;
      }
    }

    if (leftPlusTT <= 0) {
      compRef.current.style.left = `0px`;
    } else {
      compRef.current.style.left = `${leftPlusTT}px`;
    }
  };

  useEffect(() => {
    const trackPosition = () => {
      FollowChildPos();
      return requestAnimationFrame(trackPosition);
    };
    let af = trackPosition();

    return () => {
      cancelAnimationFrame(af);
    };
  }, [compRef.current, childRef.current]);
};
