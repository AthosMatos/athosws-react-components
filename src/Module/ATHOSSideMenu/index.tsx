import { ATHOSColors } from "../colors/colors";
import { ASM } from "./ASM";
import { ATHOSSideMenuProvider } from "./context/context";
import { ATHOSSideMenuProps } from "./interfaces";

import { ASMContainer, ASMExtraContainer, ASMOverlayWrapper } from "./styled";

/**
 * DESCRIBE COMPONENT
 */

export function ATHOSSideMenu(props: ATHOSSideMenuProps) {
  const Comp = (
    <ATHOSSideMenuProvider props={props}>
      <ASMExtraContainer
        accentColor={props.colors.sideBorder ?? ATHOSColors.grey.default}
      >
        <ASM />
      </ASMExtraContainer>
    </ATHOSSideMenuProvider>
  );
  if (props.asOverlay) {
    return (
      <ASMOverlayWrapper>
        {Comp}
        <ASMContainer style={props.overlayStyle}>{props.children}</ASMContainer>
      </ASMOverlayWrapper>
    );
  } else return Comp;
}
