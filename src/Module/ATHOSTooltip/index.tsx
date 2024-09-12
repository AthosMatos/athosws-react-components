import { Tooltip } from "react-tooltip";
import { v4 } from "uuid";
import { ATHOSTooltipProps } from "./interface";
import { JTTooltipText, JTWrapper } from "./styled";

export const ATHOSTooltip = (props: ATHOSTooltipProps) => {
  const id = v4().toString();

  return (
    <>
      <Tooltip
        float={props.float}
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "5px",
          ...props.toolTipStyle,
        }}
        place={props.position}
        id={id}
      >
        {typeof props.content === "string" ? (
          <JTTooltipText style={props.textStyle}>{props.content}</JTTooltipText>
        ) : (
          props.content
        )}
      </Tooltip>
      <JTWrapper
        style={props.wrapperStyle}
        /* data-tooltip-place= */
        data-tooltip-id={id}
      >
        {props.children}
      </JTWrapper>
    </>
  );
};
