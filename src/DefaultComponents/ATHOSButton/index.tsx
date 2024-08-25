import { ATHOSTooltip } from "../ATHOSTooltip";
import { ATHOSButtonProps } from "./interfaces";
import {
  ATHOSButton_action,
  ATHOSButton_alt,
  ATHOSButton_default,
  ATHOSButton_disabled,
} from "./styled/styled";

/**
 * DESCRIBE COMPONENT
 */
export const ATHOSButton = (props: ATHOSButtonProps) => {
  const { children, disabled, tooltip, color, textColor, style } = props;
  const Bttn = () => {
    if (disabled) {
      return (
        <ATHOSButton_disabled color={color} textColor={textColor} style={style}>
          {children}
        </ATHOSButton_disabled>
      );
    } else {
      const { type, onClick } = props;
      switch (type) {
        case "default":
          return (
            <ATHOSButton_default
              color={color}
              textColor={textColor}
              style={style}
              onClick={onClick}
            >
              {children}
            </ATHOSButton_default>
          );
        case "alt":
          return (
            <ATHOSButton_alt
              color={color}
              textColor={textColor}
              style={style}
              onClick={onClick}
            >
              {children}
            </ATHOSButton_alt>
          );
        case "action":
          return (
            <ATHOSButton_action
              color={color}
              textColor={textColor}
              style={style}
              onClick={onClick}
            >
              {children}
            </ATHOSButton_action>
          );
      }
    }
  };

  return tooltip ? (
    <ATHOSTooltip content={tooltip}>{Bttn()}</ATHOSTooltip>
  ) : (
    Bttn()
  );
};
