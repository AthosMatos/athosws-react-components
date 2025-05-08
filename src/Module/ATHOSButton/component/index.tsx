import { useMemo, useState } from "react";
import styled from "styled-components";
import { ATHOSCollapse } from "../../ATHOSCollapse/component";
import { ATHOSTooltip } from "../../ATHOSTooltip";
import { ATHOSButtonProps } from "./interfaces";
/**

 */

const Button = styled.button`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 0.5rem;
`;

export const ATHOSButton = (props: ATHOSButtonProps) => {
  const { tooltip, children: label, icon, confirmCollapse: iconCollapse, inConfirmClassName, className, onConfirm } = props;
  const [isConfirm, setIsConfirm] = useState(false);
  const DefaultBttn = useMemo(() => {
    return (
      <Button {...props}>
        {icon && icon}
        {label}
      </Button>
    );
  }, [props]);
  const BttnCollapse = useMemo(() => {
    return (
      <ATHOSCollapse
        onToggle={(isOpen) => {
          setIsConfirm(!!isOpen);
          if (typeof isOpen === "boolean" && !isOpen) {
            onConfirm && onConfirm();
          }
        }}
        fade
        toggleOnWrapperClick
        wrapperClassName={`items-center transition-colors cursor-pointer select-none ${isConfirm ? inConfirmClassName : className}`}
        spacing={6}
        position="right"
        collpasedComponent={label}
        hideOnClickOutside
      >
        <Button {...Object.fromEntries(Object.entries(props).filter(([key]) => !["className", "style"].includes(key)))}>{icon}</Button>
      </ATHOSCollapse>
    );
  }, [props, isConfirm]);

  const Bttn = useMemo(() => {
    if (iconCollapse) {
      return BttnCollapse;
    } else {
      return DefaultBttn;
    }
  }, [DefaultBttn, BttnCollapse, iconCollapse]);
  return tooltip ? (
    <ATHOSTooltip followCursor tooltipContent={tooltip}>
      {Bttn}
    </ATHOSTooltip>
  ) : (
    Bttn
  );
};
