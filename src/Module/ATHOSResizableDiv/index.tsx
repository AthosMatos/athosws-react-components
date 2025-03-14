import Indicator from "./components/Indicator";
import useResizableDiv from "./hooks/use";
import { ResizableDivProps } from "./interfaces";
import { RDContainer, RDPreWrapper, RDResizeIcon, RDWrapper } from "./styled";

export const ATHOSResizableDiv = (props: ResizableDivProps) => {
  const {
    indicatorPadding,
    indicatorRef,
    indicatorWrapperRef,
    isHover,
    onmousemove,
    resizableRef,
    setIsHover,
    setToogle,
    toogle,
    isDown,
    setIsDown,
    sizes,
  } = useResizableDiv(props.localSaveName);

  return props.disabled ? (
    <RDWrapper style={props.style} className={props.className}>
      {props.children}
    </RDWrapper>
  ) : (
    <RDPreWrapper withToogle={props.withToogle}>
      {props.withToogle && <RDResizeIcon toogle={toogle} onClick={() => setToogle(!toogle)} />}
      <RDContainer
        showBorder={toogle}
        width={sizes.Width}
        height={sizes.Height}
        onMouseMove={onmousemove}
        ref={resizableRef}
        onMouseDown={(e) => {
          //check if the click is on the resize icon
          if (!indicatorRef.current) return;
          const indicatorRect = indicatorRef.current.getBoundingClientRect();

          if (
            e.clientX >= indicatorRect.right &&
            e.clientX <= indicatorRect.right &&
            e.clientY >= indicatorRect.bottom &&
            e.clientY <= indicatorRect.bottom
          )
            return;
          setIsDown(true);
        }}
        onMouseOut={(e) => {
          if (isDown) return;
          setIsHover(false);
          e.currentTarget.style.cursor = "default";
        }}
        onMouseLeave={(e) => {
          if (isDown) return;
          setIsHover(false);
          e.currentTarget.style.cursor = "default";
        }}
        className={`${props.outerClassName} !relative`}
        style={props.OuterContainerStyle}
      >
        <RDWrapper className={props.className} style={props.style}>
          {props.children}
        </RDWrapper>

        {isHover && toogle && (
          <Indicator
            setIsDown={setIsDown}
            indicatorPadding={indicatorPadding}
            indicatorRef={indicatorRef}
            indicatorWrapperRef={indicatorWrapperRef}
          />
        )}
      </RDContainer>
    </RDPreWrapper>
  );
};
