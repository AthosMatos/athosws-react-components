import { ASM } from "./ASM";
import { ATHOSSideMenuProvider } from "./context/context";
import { ATHOSSideMenuProps } from "./interfaces";

import { ASMContainer, ASMExtraContainer, ASMOverlayWrapper } from "./styled";

/**
 * DESCRIBE COMPONENT
 */

export const ATHOSSideMenu = (props: ATHOSSideMenuProps) => {
  const Comp = (
    <ATHOSSideMenuProvider props={props}>
      <ASMExtraContainer accentColor={props.colors.accent}>
        <ASM
          accentColor={props.colors.accent}
          activeColor={props.colors.active}
        />
      </ASMExtraContainer>
    </ATHOSSideMenuProvider>
  );
  if (props.asOverlay) {
    return (
      <ASMOverlayWrapper>
        {Comp}
        <ASMContainer>{props.children}</ASMContainer>
      </ASMOverlayWrapper>
    );
  } else return Comp;
};
