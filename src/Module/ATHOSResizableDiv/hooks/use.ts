import { useEffect, useRef, useState } from "react";
import useLocalSave from "./useLocalSave";

const useResizableDiv = (localSaveName?: string) => {
  const [toogle, setToogle] = useState(false);
  const indicatorSize = 28;
  const indicatorPadding = 12;
  const indicatorClickMargin = 30;
  const indicatorRef = useRef<HTMLDivElement>(null);
  const indicatorWrapperRef = useRef<HTMLDivElement>(null);
  const resizableRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const { saveSizes, sizes } = useLocalSave({ savename: localSaveName });
  const onmousemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    /*  console.log("onmousemove");
    console.log("isDown", isDown, "toogle", toogle); */
    if (isDown || !toogle) return;
    const { clientX: mousex, clientY: mousey, currentTarget } = e;
    const currRect = currentTarget.getBoundingClientRect();

    const isxincorner = currRect.right - mousex < indicatorClickMargin;
    const isyincorner = currRect.bottom - mousey < indicatorClickMargin;
    const isInCorner = isxincorner || isyincorner;

    if (!isInCorner && !isDown) {
      setIsHover(false);
      currentTarget.style.cursor = "default";
      return;
    }
    setIsHover(true);

    if (indicatorRef.current === null || indicatorWrapperRef.current === null || resizableRef.current === null) return;
    if (isxincorner && isyincorner) {
      indicatorWrapperRef.current.style.right = `-${indicatorSize / 4 + indicatorPadding}px`;
      indicatorWrapperRef.current.style.bottom = `-${indicatorSize / 4 + indicatorPadding}px`;
      currentTarget.style.cursor = "nwse-resize";
      indicatorRef.current.style.width = `${indicatorSize / 2}px`;
      indicatorRef.current.style.height = `${indicatorSize / 2}px`;
    } else if (isyincorner) {
      indicatorWrapperRef.current.style.bottom = `-${indicatorSize / 4 + indicatorPadding}px`;
      indicatorWrapperRef.current.style.right = `${resizableRef.current.getBoundingClientRect().width - mousex - indicatorPadding / 2}px`;

      indicatorRef.current.style.width = `${indicatorSize}px`;
      indicatorRef.current.style.height = `${indicatorSize / 2}px`;
      currentTarget.style.cursor = "ns-resize";
    } else if (isxincorner) {
      indicatorWrapperRef.current.style.right = `-${indicatorSize / 4 + indicatorPadding}px`;
      indicatorWrapperRef.current.style.bottom = `${
        resizableRef.current.getBoundingClientRect().bottom - mousey - indicatorPadding - indicatorSize / 2
      }px`;

      indicatorRef.current.style.width = `${indicatorSize / 2}px`;
      indicatorRef.current.style.height = `${indicatorSize}px`;
      currentTarget.style.cursor = "ew-resize";
    }
  };

  useEffect(() => {
    const resize = (e: MouseEvent) => {
      if (!resizableRef.current) return;
      const currWidth = e.pageX - resizableRef.current.offsetLeft;
      const currHeight = e.pageY - resizableRef.current.offsetTop;
      const cursorSize = 8;

      const cursor = resizableRef.current.style.cursor;
      switch (cursor) {
        case "ns-resize":
          resizableRef.current.style.height = `${currHeight + cursorSize / 2}px`;
          return;
        case "ew-resize":
          resizableRef.current.style.width = `${currWidth + cursorSize / 2}px`;
          return;
        case "nwse-resize":
          resizableRef.current.style.width = `${currWidth + cursorSize / 2}px`;
          resizableRef.current.style.height = `${currHeight + cursorSize / 2}px`;
      }
    };

    const onMouseUp = () => {
      if (!resizableRef.current) return;
      setIsDown(false);
      saveSizes(resizableRef.current.style.width, resizableRef.current.style.height);
    };

    if (!toogle)
      return () => {
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", onMouseUp);
      };
    if (isDown) {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDown]);

  return {
    onmousemove,
    resizableRef,
    indicatorRef,
    indicatorWrapperRef,
    isHover,
    setIsHover,
    toogle,
    setToogle,
    indicatorPadding,
    setIsDown,
    isDown,
    sizes,
  };
};

export default useResizableDiv;
