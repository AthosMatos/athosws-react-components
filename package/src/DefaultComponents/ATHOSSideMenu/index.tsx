import { GoSignOut } from "react-icons/go";
import ASBExitOption from "./ExitOption";
import ASBOption from "./Option";
import ASBSubOption from "./SubOption";
import { ATHOSSideMenuProvider } from "./context";
import { ATHOSSideMenuProps } from "./interfaces";
import { ASBContainer, ASBWrapper } from "./styled";

/**
 * DESCRIBE COMPONENT
 */

export const ATHOSSideMenu = (props: ATHOSSideMenuProps) => {
  return (
    <ATHOSSideMenuProvider props={props}>
      <ASBContainer
        accentColor={props.colors.accent}
        activeColor={props.colors.active}
      >
        <ASBWrapper>
          {props.options.map((data, index) => (
            <ASBOption
              iconSize={data.iconSize}
              key={index}
              index={index}
              Icon={data.Icon}
              label={data.label}
            >
              {data.subOptions &&
                data.subOptions.map((subOption, subIndex) => (
                  <ASBSubOption
                    parentIndex={index}
                    key={subIndex}
                    index={subIndex}
                    label={subOption.label}
                  />
                ))}
            </ASBOption>
          ))}
        </ASBWrapper>
        {props.onExit && (
          <ASBExitOption
            onClick={props.onExit}
            Icon={GoSignOut}
            label={"Sair"}
          />
        )}
      </ASBContainer>
    </ATHOSSideMenuProvider>
  );
};
