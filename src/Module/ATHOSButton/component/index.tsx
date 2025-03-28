import { useMemo } from "react";
import { ATHOSTooltip } from "../../ATHOSTooltip";
import { ATHOSButtonProps } from "./interfaces";
import { ATHOSButton_action, ATHOSButton_alt, ATHOSButton_default, ATHOSButton_disabled } from "./styled/styled";

/**
 * A versatile button component with multiple styles (`default`, `alt`, `action`, `disabled`), customizable colors, and optional tooltip support.
 * Handles click events and can be disabled when needed.
 *
 * Props:
 * - `type`: Defines the button style (`default`, `alt`, `action`).
 * - `onClick`: Function triggered on button click.
 * - `children`: Button content.
 * - `tooltip`: Optional tooltip content displayed on hover.
 * - `disabled`: Disables the button if set to `true`.
 * - `style`: Custom inline styles.
 * - `color` / `textColor`: Button and text colors, customizable based on button type.
 *
 * Example usage:
 *
 *  ```tsx
 * <ATHOSButton type="default" onClick={() => console.log("Clicked")}>
 *   Click Me
 * </ATHOSButton>
 * ```
 */

export const ATHOSButton = (props: ATHOSButtonProps) => {
  const { children, disabled, tooltip, color, textColor, style, small, type, onClick } = props;
  const Bttn = useMemo(() => {
    if (disabled) {
      return (
        <ATHOSButton_disabled color={color} textColor={textColor} style={style}>
          {children}
        </ATHOSButton_disabled>
      );
    } else {
      switch (type) {
        case "default":
          return (
            <ATHOSButton_default small={small} color={color} textColor={textColor} style={style} onClick={onClick}>
              {children}
            </ATHOSButton_default>
          );
        case "alt":
          return (
            <ATHOSButton_alt small={small} color={color} textColor={textColor} style={style} onClick={onClick}>
              {children}
            </ATHOSButton_alt>
          );
        case "action":
          return (
            <ATHOSButton_action small={small} color={color} textColor={textColor} style={style} onClick={onClick}>
              {children}
            </ATHOSButton_action>
          );
      }
    }
  }, [children, disabled, color, textColor, style, small, type, onClick]);

  return tooltip ? <ATHOSTooltip tooltipContent={tooltip}>{Bttn}</ATHOSTooltip> : Bttn;
};
