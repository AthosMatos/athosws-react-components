import { Tooltip } from "react-tooltip";
import { v4 } from "uuid";
import { ATHOSColors } from "../colors/colors";
import { ATHOSTooltipProps } from "./interface";
import { JTTooltipText, JTWrapper } from "./styled";

export const ATHOSTooltip = (props: ATHOSTooltipProps) => {
  const id = v4();

  return (
    <>
      <Tooltip
        style={{
          backgroundColor: ATHOSColors.black,
          color: ATHOSColors.white,
          borderRadius: "5px",
          ...props.wrapperStyle,
        }}
        id={id}
      >
        {typeof props.content === "string" ? (
          <JTTooltipText style={props.textStyle}>{props.content}</JTTooltipText>
        ) : (
          props.content
        )}
      </Tooltip>
      <JTWrapper data-tooltip-place={props.position} data-tooltip-id={id}>
        {props.children}
      </JTWrapper>
    </>
  );
};
