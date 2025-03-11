import { useRef, useState } from "react";
import useResizableDiv from "./hooks";
import { ResizableDivProps } from "./interfaces";
import { RDContainer, RDPreWrapper, RDResizeIcon, RDWrapper } from "./styled";

export const ATHOSResizableDiv = (props: ResizableDivProps) => {
  const [toogle, setToogle] = useState(false);
  const {} = useResizableDiv();

  const indicatorRef = useRef<HTMLDivElement>(null);
  const resizableRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [isHover, setIsHover] = useState(false);
  return props.disabled ? (
    <RDWrapper matchChildSize={props.matchChildSize || props.disabled} style={props.style} className={props.className}>
      {props.children}
    </RDWrapper>
  ) : (
    <RDPreWrapper withToogle={props.withToogle}>
      {props.withToogle && <RDResizeIcon toogle={toogle} onClick={() => setToogle(!toogle)} />}
      <RDContainer
        ref={resizableRef}
        onMouseMove={(e) => {
          indicatorRef.current.style.left = `${e.pageX}px`;
          indicatorRef.current.style.top = `${e.pageY}px`;
          if (isDown) {
            const currWidth = e.pageX - resizableRef.current.offsetLeft + 30;
            const currHeight = e.pageY - resizableRef.current.offsetTop + 30;
            resizableRef.current.style.width = `${currWidth}px`;
            resizableRef.current.style.height = `${currHeight}px`;
          }
        }}
        onMouseDown={() => {
          setIsDown(true);
        }}
        onMouseUp={() => {
          setIsDown(false);
        }}
        onMouseLeave={() => {
          setIsDown(false);
          setIsHover(false);
        }}
        onMouseOver={() => {
          setIsHover(true);
        }}
        className={`${props.outerClassName}`}
        style={props.OuterContainerStyle}
      >
        <RDWrapper matchChildSize={props.matchChildSize} className={props.className} style={props.style}>
          {props.children}
        </RDWrapper>
        <div
          ref={indicatorRef}
          style={
            {
              // opacity: isHover ? 1 : 0,
            }
          }
          className="absolute w-2 h-2 bg-red-500 rounded-full"
        />
        {/* <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            outline: `1px solid ${ATHOSColors.aqua.default}`,
            display: "none",
            borderRadius: "26px",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <RDDot />
        </div> */}
      </RDContainer>
    </RDPreWrapper>
  );
};
