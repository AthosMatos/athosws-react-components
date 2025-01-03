import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ResizableDivProps } from "./interfaces";
import { defaultBorder, highlightBorder } from "./styled";

const useResizableDiv = ({ resizableConers: res, saveInLocalStorage, withToogle }: ResizableDivProps) => {
  const resizableConers = res ?? {
    top: false,
    right: true,
    bottom: true,
    left: false,
  };
  const name = saveInLocalStorage ?? v4();
  const localStorage = window.localStorage;
  const wName = `width-${name}`;
  const hName = `height-${name}`;
  const divName = `resizableDiv-${name}`;
  const borderName = `borderIndicator-${divName}`;
  const Width = localStorage.getItem(wName) ?? "fit-content";
  const Height = localStorage.getItem(hName) ?? "fit-content";

  const [toogle, setToogle] = useState(false);

  const clickThreshold = 10;

  function getElementPositionWithScroll(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const finalX = rect.left + scrollLeft;
    const finalY = rect.top + scrollTop;

    return {
      x: finalX,
      y: finalY,
      left: finalX,
      top: finalY,
      right: finalX + rect.width,
      bottom: finalY + rect.height,
      width: rect.width,
      height: rect.height,
    };
  }

  useEffect(() => {
    const div = document.getElementById(divName);
    const borderIndicator = document.getElementById(borderName);
    if (!div || !borderIndicator) return;
    if (withToogle && !toogle) {
      div.style.border = defaultBorder;
      div.style.cursor = "auto";
      borderIndicator.style.display = "none";
      return;
    } else if (withToogle) {
      if (resizableConers.right) {
        div.style.borderRight = highlightBorder;
      }
      if (resizableConers.bottom) {
        div.style.borderBottom = highlightBorder;
      }
      if (resizableConers.left) {
        div.style.borderLeft = highlightBorder;
      }
      if (resizableConers.top) {
        div.style.borderTop = highlightBorder;
      }
    }

    const mousemove = (e: MouseEvent) => {
      const divRect = getElementPositionWithScroll(div);

      const isInComponent =
        e.pageX >= divRect.x - clickThreshold &&
        e.pageX <= divRect.x + clickThreshold + divRect.width &&
        e.pageY >= divRect.y - clickThreshold &&
        e.pageY <= divRect.y + clickThreshold + divRect.height;

      if (!borderIndicator) return;

      if (!isInComponent) {
        if (!withToogle) div.style.border = defaultBorder;
        borderIndicator.style.display = "none";
        return;
      }

      const distances = {
        right: Math.abs(e.pageX - divRect.x - divRect.width),
        bottom: Math.abs(e.pageY - divRect.y - divRect.height),
        left: Math.abs(e.pageX - divRect.x),
        top: Math.abs(e.pageY - divRect.y),
      };
      const onEdge = {
        right: distances.right <= clickThreshold,
        bottom: distances.bottom <= clickThreshold,
        left: distances.left <= clickThreshold,
        top: distances.top <= clickThreshold,
      };

      let sizeStyle = 0; //corner (round) = 0, horizontal = 1, vertical = 2
      let indicatorPosition = null;

      if (onEdge.bottom && onEdge.right) {
        indicatorPosition = {
          left: divRect.right - 5,
          top: divRect.bottom - 5,
          cursor: "nwse-resize",
        };
        sizeStyle = 0;
      } else if (onEdge.bottom && onEdge.left) {
        indicatorPosition = {
          left: divRect.left - 5,
          top: divRect.bottom - 5,
          cursor: "nesw-resize",
        };
        sizeStyle = 0;
      } else if (onEdge.top && onEdge.right) {
        indicatorPosition = {
          left: divRect.right - 5,
          top: divRect.top - 5,
          cursor: "nesw-resize",
        };
        sizeStyle = 0;
      } else if (onEdge.top && onEdge.left) {
        indicatorPosition = {
          left: divRect.left - 5,
          top: divRect.top - 5,
          cursor: "nwse-resize",
        };
        sizeStyle = 0;
      } else if (onEdge.bottom) {
        indicatorPosition = {
          left: e.pageX - 10,
          top: divRect.bottom - 5,
          cursor: "ns-resize",
        };
        sizeStyle = 1;
      } else if (onEdge.right) {
        indicatorPosition = {
          left: divRect.right - 5,
          top: e.pageY - 10,
          cursor: "ew-resize",
        };
        sizeStyle = 2;
      } else if (onEdge.top) {
        indicatorPosition = {
          left: e.pageX - 10,
          top: divRect.top - 5,
          cursor: "ns-resize",
        };
        sizeStyle = 1;
      } else if (onEdge.left) {
        indicatorPosition = {
          left: divRect.left - 5,
          top: e.pageY - 10,
          cursor: "ew-resize",
        };
        sizeStyle = 2;
      }

      if (indicatorPosition) {
        borderIndicator.style.display = "flex";
        borderIndicator.style.left = `${indicatorPosition.left}px`;
        borderIndicator.style.top = `${indicatorPosition.top}px`;
        borderIndicator.style.width = sizeStyle === 1 ? "20px" : "10px";
        borderIndicator.style.height = sizeStyle === 2 ? "20px" : "10px";
        div.style.cursor = indicatorPosition.cursor;
      } else {
        borderIndicator.style.display = "none";
        div.style.cursor = "auto";
      }
    };

    const mousedown = (e: MouseEvent) => {
      e.preventDefault();
      const divRect = getElementPositionWithScroll(div);
      const isInComponent =
        e.pageX >= divRect.x - clickThreshold &&
        e.pageX <= divRect.x + clickThreshold + divRect.width &&
        e.pageY >= divRect.y - clickThreshold &&
        e.pageY <= divRect.y + clickThreshold + divRect.height;

      if (!isInComponent) {
        return;
      }

      const distances = {
        right: Math.abs(e.pageX - divRect.x - divRect.width),
        bottom: Math.abs(e.pageY - divRect.y - divRect.height),
        left: Math.abs(e.pageX - divRect.x),
        top: Math.abs(e.pageY - divRect.y),
      };
      const onEdge = {
        right: distances.right <= clickThreshold && resizableConers.right,
        bottom: distances.bottom <= clickThreshold && resizableConers.bottom,
        left: distances.left <= clickThreshold && resizableConers.left,
        top: distances.top <= clickThreshold && resizableConers.top,
      };
      type position = "top" | "right" | "bottom" | "left";
      const positions: position[] = [];

      if (onEdge.bottom) {
        positions.push("bottom");
      }
      if (onEdge.right) {
        positions.push("right");
      }
      if (onEdge.top) {
        positions.push("top");
      }
      if (onEdge.left) {
        positions.push("left");
      }

      const resizeWRight = (e: MouseEvent) => {
        const dRect = getElementPositionWithScroll(div);
        const value = e.pageX - dRect.x;
        div.style.width = `${value}px`;
        div.style.borderRight = highlightBorder;
      };
      const resizeHBottom = (e: MouseEvent) => {
        const divRect = getElementPositionWithScroll(div);
        const value = e.pageY - divRect.y;
        div.style.height = `${value}px`;
        div.style.borderBottom = highlightBorder;
      };
      const resizeWLeft = (e: MouseEvent) => {
        const divRect = getElementPositionWithScroll(div);
        const value = e.pageX - divRect.x;
        div.style.width = `${divRect.width - value}px`;
        div.style.borderLeft = highlightBorder;
        div.style.left = `${divRect.x + value}px`;
      };
      const resizeHTop = (e: MouseEvent) => {
        const divRect = getElementPositionWithScroll(div);
        const value = e.pageY - divRect.y;
        div.style.height = `${divRect.height - value}px`;
        div.style.borderTop = highlightBorder;
        div.style.top = `${divRect.y + value}px`;
      };

      if (positions.includes("right")) {
        document.addEventListener("mousemove", resizeWRight);
      } else {
        if (!withToogle) div.style.borderRight = defaultBorder;
      }
      if (positions.includes("bottom")) {
        document.addEventListener("mousemove", resizeHBottom);
      } else {
        if (!withToogle) div.style.borderBottom = defaultBorder;
      }
      if (positions.includes("left")) {
        document.addEventListener("mousemove", resizeWLeft);
      } else {
        if (!withToogle) div.style.borderLeft = defaultBorder;
      }
      if (positions.includes("top")) {
        document.addEventListener("mousemove", resizeHTop);
      } else {
        if (!withToogle) div.style.borderTop = defaultBorder;
      }
      //clear all listeners
      document.addEventListener("mouseup", (e) => {
        document.removeEventListener("mousemove", resizeWRight);
        document.removeEventListener("mousemove", resizeHBottom);
        document.removeEventListener("mousemove", resizeWLeft);
        document.removeEventListener("mousemove", resizeHTop);
        if (saveInLocalStorage) {
          localStorage.setItem(wName, div.style.width);
          localStorage.setItem(hName, div.style.height);
        }
        if (!withToogle) div.style.border = defaultBorder;
      });
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mousedown", mousedown);

    return () => {
      //clear all listeners
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mousedown", mousedown);
    };
  }, [toogle]);

  return { Width, Height, divName, borderName, toogle, setToogle };
};

export default useResizableDiv;
