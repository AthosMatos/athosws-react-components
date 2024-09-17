import { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
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
    props: { colors },
    hideMenu,
    editing,
  } = useATHOSSideMenu();
  const { label, Icon, iconSize } = option;

  const hasChildren = !(children == undefined || children == null);
  const isOpen = option.show;
  const hasSelectedChildren = option.subOptions?.some((sub) => sub.show);

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
          childrenHeight={`calc(${childrenHeight} + ${
            isOpen ? "0.8rem" : "0px"
          })`}
          accent={colors.accent}
          provided={provided}
        >
          <ASMOptionWrapper
            editing={editing}
            width={hideMenu ? defaulIconSize : "auto"}
            accentColor={colors.accent}
            activeColor={colors.active}
            onClick={() => {
              !editing && selectOption(option.id);
            }}
            hasSelectedChildren={!hasSelectedChildren && hasChildren}
            hasChildren={hasChildren}
            clicked={isOpen || hasSelectedChildren}
          >
            <ASMLabelIconWrapper>
              {Icon ? (
                <ASMIconWrapper iconSize={defaulIconSize}>
                  <Icon
                    style={{
                      pointerEvents: "none",
                    }}
                    size={iconSize ?? defaulIconSize}
                  />
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
