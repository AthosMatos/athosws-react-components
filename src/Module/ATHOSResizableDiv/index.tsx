import { useRef, useState } from "react";
import Indicator from "./components/Indicator";
import useResizableDiv from "./hooks";
import { ResizableDivProps } from "./interfaces";
import { RDContainer, RDPreWrapper, RDResizeIcon, RDWrapper } from "./styled";

export const ATHOSResizableDiv = (props: ResizableDivProps) => {
  const [toogle, setToogle] = useState(false);
  const {} = useResizableDiv();
  const indicatorSize = 16;
  const indicatorRef = useRef<HTMLDivElement>(null);
  const resizableRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const onmousemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX: mousex, clientY: mousey } = e;
    const currRect = e.currentTarget.getBoundingClientRect();

    const isxincorner = currRect.right - mousex < 30;
    const isyincorner = currRect.bottom - mousey < 30;
    const isInCorner = isxincorner || isyincorner;

    if (!isInCorner && !isDown) {
      setIsHover(false);
      return;
    }
    setIsHover(true);
    if (isxincorner && isyincorner) {
      /*  indicatorRef.current.style.left = `${currRect.right - indicatorSize / 2}px`;
      indicatorRef.current.style.top = `${currRect.bottom - indicatorSize / 2}px`; */
    } else if (isyincorner) {
      /*    indicatorRef.current.style.left = `${e.pageX}px`;
      indicatorRef.current.style.top = `${currRect.bottom - indicatorSize / 2}px`; */
    } else if (isxincorner) {
      indicatorRef.current.style.top = `${e.pageY}px`;
      indicatorRef.current.style.left = `${currRect.right - indicatorSize / 2}px`;
    }

    //indicatorRef.current.style.top = `${e.pageY}px`;
    if (isDown) {
      const currWidth = e.pageX - resizableRef.current.offsetLeft + 30;
      const currHeight = e.pageY - resizableRef.current.offsetTop + 30;
      resizableRef.current.style.width = `${currWidth}px`;
      resizableRef.current.style.height = `${currHeight}px`;
    }
  };

  return props.disabled ? (
    <RDWrapper matchChildSize={props.matchChildSize || props.disabled} style={props.style} className={props.className}>
      {props.children}
    </RDWrapper>
  ) : (
    <RDPreWrapper withToogle={props.withToogle}>
      {props.withToogle && <RDResizeIcon toogle={toogle} onClick={() => setToogle(!toogle)} />}
      <RDContainer
        ref={resizableRef}
        onMouseMove={onmousemove}
        onMouseDown={() => {
          setIsDown(true);
        }}
        onMouseUp={() => {
          setIsDown(false);
        }}
        className={`${props.outerClassName} !relative`}
        style={props.OuterContainerStyle}
      >
        <RDWrapper matchChildSize={props.matchChildSize} className={props.className} style={props.style}>
          {props.children}
        </RDWrapper>

        <Indicator indicatorRef={indicatorRef} indicatorSize={indicatorSize} isHover={isHover} />
      </RDContainer>
    </RDPreWrapper>
  );
};
