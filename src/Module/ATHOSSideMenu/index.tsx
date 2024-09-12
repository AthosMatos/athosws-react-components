import { GoSignOut } from "react-icons/go";
import ASMExitOption from "./components/ExitOption";
import { ATHOSSideMenuProvider } from "./context";
import { ATHOSSideMenuProps } from "./interfaces";

import ASMOption from "./components/Option";
import ASMSubOption from "./components/SubOption";
import { ASMContainer, ASMExtraContainer, ASMWrapper } from "./styled";

/**
 * DESCRIBE COMPONENT
 */

export const ATHOSSideMenu = (props: ATHOSSideMenuProps) => {
  return (
    <ATHOSSideMenuProvider props={props}>
      <ASMExtraContainer accentColor={props.colors.accent}>
        <ASMContainer
          accentColor={props.colors.accent}
          activeColor={props.colors.active}
        >
          <ASMWrapper>
            {props.options.map((data, index) => (
              <ASMOption
                iconSize={data.iconSize}
                key={index}
                index={index}
                Icon={data.Icon}
                label={data.label}
              >
                {data.subOptions &&
                  data.subOptions.map((subOption, subIndex) => (
                    <ASMSubOption
                      parentIndex={index}
                      key={subIndex}
                      index={subIndex}
                      label={subOption.label}
                    />
                  ))}
              </ASMOption>
            ))}
          </ASMWrapper>
          {props.onExit && (
            <ASMExitOption
              onClick={props.onExit.onClick}
              Icon={props.onExit.Icon ?? GoSignOut}
              label={props.onExit.label}
            />
          )}
        </ASMContainer>
      </ASMExtraContainer>
    </ATHOSSideMenuProvider>
  );
};