import { v4 } from "uuid";
import { ATHOSColors } from "../colors/colors";
import { ASM } from "./ASM";
import { ATHOSSideMenuProvider } from "./context/context";
import { ATHOSSideMenuProps } from "./interfaces";

import PageTitle from "./ASM/PageTitle";
import { ASMContainer, ASMExtraContainer, ASMOverlayWrapper } from "./styled";

/**
 * DESCRIBE COMPONENT
 */

export function ATHOSSideMenu(props: ATHOSSideMenuProps) {
  const Comp = (
    <ASMExtraContainer accentColor={props.colors.sideBorder ?? ATHOSColors.grey.default}>
      <ASM />
    </ASMExtraContainer>
  );

  return (
    <ATHOSSideMenuProvider
      props={{
        ...props,
        options: props.options.map((opt) => ({
          ...opt,
          id: opt.id ?? v4(),
          subOptions: opt.subOptions?.map((subOpt) => ({
            ...subOpt,
            id: subOpt.id ?? v4(),
            subSubOptions: subOpt.subsubOptions?.map((subSubOpt) => ({
              ...subSubOpt,
              id: subSubOpt.id ?? v4(),
            })),
          })),
        })),
      }}
    >
      {props.asOverlay ? (
        <ASMOverlayWrapper overlayFitScreen={props.overlayFitScreen}>
          {Comp}
          <ASMContainer>
            <PageTitle />
            <div className="flex-1 overflow-auto" style={props.overlayStyle}>
              {props.children}
            </div>
          </ASMContainer>
        </ASMOverlayWrapper>
      ) : (
        Comp
      )}
    </ATHOSSideMenuProvider>
  );
}
