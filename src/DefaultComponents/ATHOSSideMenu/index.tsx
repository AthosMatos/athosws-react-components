import { createRef, useEffect, useState } from "react";
import { GoSignOut } from "react-icons/go";
import ASMExitOption from "./ExitOption";
import ASMMenuHider from "./MenuHider";
import ASMOption from "./Option";
import ASMSubOption from "./SubOption";
import { ATHOSSideMenuProvider } from "./context";
import { ATHOSSideMenuProps } from "./interfaces";
import { ASMContainer, ASMExtraContainer, ASMWrapper } from "./styled";

/**
 * DESCRIBE COMPONENT
 */

export const ATHOSSideMenu = (props: ATHOSSideMenuProps) => {
  const [extraContainerHeight, setExtraContainerHeight] = useState<number>();
  const extraContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (extraContainerRef.current) {
      console.log(extraContainerRef.current.clientHeight);
      setExtraContainerHeight(extraContainerRef.current.clientHeight);
    }
  }, [extraContainerRef]);

  return (
    <ATHOSSideMenuProvider props={props}>
      <ASMExtraContainer
        accentColor={props.colors.accent}
        ref={extraContainerRef}
      >
        {extraContainerHeight && (
          <ASMMenuHider
            color={props.colors.accent}
            extraContainerHeight={extraContainerHeight}
          />
        )}

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
              onClick={props.onExit}
              Icon={GoSignOut}
              label={"Sair"}
            />
          )}
        </ASMContainer>
      </ASMExtraContainer>
    </ATHOSSideMenuProvider>
  );
};
