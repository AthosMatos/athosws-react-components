import { ATHOSColors } from "../colors/colors";
import useResizableDiv from "./hooks";
import { ResizableDivProps } from "./interfaces";
import { RDContainer, RDDot, RDPreWrapper, RDResizeIcon, RDWrapper } from "./styled";

export const ATHOSResizableDiv = (props: ResizableDivProps) => {
  const { Height, Width, divName, borderName, setToogle, toogle } = useResizableDiv(props);
  return props.disabled ? (
    <RDWrapper matchChildSize={props.matchChildSize || props.disabled} style={props.style} className={props.className}>
      {props.children}
    </RDWrapper>
  ) : (
    <RDPreWrapper withToogle={props.withToogle}>
      {props.withToogle && <RDResizeIcon toogle={toogle} onClick={() => setToogle(!toogle)} />}
      <RDContainer width={Width} height={Height} id={divName} className={props.outerClassName} style={props.OuterContainerStyle}>
        <RDWrapper matchChildSize={props.matchChildSize} className={props.className} style={props.style}>
          {props.children}
        </RDWrapper>

        <div
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
          id={borderName}
        >
          <RDDot />
        </div>
      </RDContainer>
    </RDPreWrapper>
  );
};
