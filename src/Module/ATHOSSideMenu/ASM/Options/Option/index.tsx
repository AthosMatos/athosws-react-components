import { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ATHOSColors } from "../../../../colors/colors";
import { getContrastColor } from "../../../../utils/color-utils";
import { useATHOSSideMenu } from "../../../context/context";
import {
  ASMArrowDown,
  ASMIconWrapper,
  ASMLabelIconWrapper,
  defaulIconSize,
  IconlessLabel,
} from "../../../styled";
import { ASMSubOptionsWrapper, suboptheight } from "../SubOption/styled";
import { ASMOptionProps } from "./interfaces";
import { ASMOptionContainer, ASMOptionLabel, ASMOptionWrapper } from "./styled";

const ASMOption = ({ option, children, index }: ASMOptionProps) => {
  const {
    selectOption,
    props: {
      colors: { background },
    },
    hideMenu,
    editing,
  } = useATHOSSideMenu();
  const { label, Icon, iconSize, colorConfig } = option;

  const hasChildren = !(children == undefined || children == null);
  const isOpen = option.selected;
  const hasSelectedChildren = option.subOptions?.some((sub) => sub.selected);

  const childrenHeight = useMemo(() => {
    const childrenAmount = (children as any)?.length;
    const halfGap = "0.2rem";
    if (isOpen)
      return `calc((${suboptheight} * ${childrenAmount}) + ${halfGap})`;
    return "0px";
  }, [isOpen]);

  return (
    <Draggable isDragDisabled={!editing} draggableId={option.id} index={index}>
      {(provided) => (
        <ASMOptionContainer
          backColor={
            background
              ? getContrastColor(background) == "black"
                ? ATHOSColors.grey.light
                : ATHOSColors.grey.darker
              : ATHOSColors.grey.default
          }
          provided={provided}
        >
          <ASMOptionWrapper
            colorConfig={colorConfig}
            label={label}
            hasSelectedChildren={hasSelectedChildren}
            hasChildren={hasChildren}
            clicked={isOpen || hasSelectedChildren}
            onClick={() => {
              !editing && selectOption(option.id);
            }}
          >
            <ASMLabelIconWrapper>
              {Icon ? (
                <ASMIconWrapper iconSize={defaulIconSize}>
                  {typeof Icon === "function" ? (
                    <Icon
                      style={{
                        pointerEvents: "none",
                        //color: colors.accent,
                      }}
                      size={iconSize ?? defaulIconSize}
                    />
                  ) : (
                    Icon
                  )}
                </ASMIconWrapper>
              ) : (
                hideMenu && (
                  <ASMIconWrapper iconSize={defaulIconSize}>
                    <IconlessLabel>{label[0]}</IconlessLabel>
                  </ASMIconWrapper>
                )
              )}

              <ASMOptionLabel hasIcon={Icon != undefined} hide={hideMenu}>
                {label}
              </ASMOptionLabel>
            </ASMLabelIconWrapper>

            {children && !hideMenu && <ASMArrowDown clicked={isOpen} />}
          </ASMOptionWrapper>
          {children && !hideMenu && (
            <ASMSubOptionsWrapper
              ChildrenHeight={childrenHeight}
              isOpen={isOpen}
            >
              {children}
            </ASMSubOptionsWrapper>
          )}
        </ASMOptionContainer>
      )}
    </Draggable>
  );
};

export default ASMOption;
