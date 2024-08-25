import { ATHOSTooltip } from "../ATHOSTooltip";
import { ATHOSButtonProps, DefaultATHOSButtonProps } from "./interfaces";
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
  const { children, disabled, tooltip } = props;
  const Bttn = () => {
    if (disabled) {
      return <ATHOSButton_disabled>{children}</ATHOSButton_disabled>;
    } else {
      const { type, onClick } = props as DefaultATHOSButtonProps;
      switch (type) {
        case "default":
          return (
            <ATHOSButton_default onClick={onClick}>
              {children}
            </ATHOSButton_default>
          );
        case "alt":
          return (
            <ATHOSButton_alt onClick={onClick}>{children}</ATHOSButton_alt>
          );
        case "action":
          return (
            <ATHOSButton_action onClick={onClick}>
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
