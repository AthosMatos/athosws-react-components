import { useATHOSSideMenu } from "../context";
import { ASMOptionProps } from "../interfaces";
import {
  ASMArrowDown,
  ASMIconWrapper,
  ASMLabelIconWrapper,
  ASMOptionContainer,
  ASMOptionLabel,
  ASMOptionWrapper,
  ASMSubOptionsWrapper,
  defaulIconSize,
  IconLessLabel,
  suboptheight,
} from "../styled";

const ASMOption = ({
  index,
  Icon,
  label,
  children,
  iconSize,
}: ASMOptionProps) => {
  const {
    selectOption,
    selectedDataTrack,
    props: { colors },
    hideMenu,
  } = useATHOSSideMenu();

  const hasChildren = !(children == undefined || children == null);
  const isOpen = selectedDataTrack[index].show;
  const hasSelectedChildren = selectedDataTrack[index].subOptions?.some(
    (sub) => sub.show
  );
  const childrenAmount = (children as any)?.length;
  const halfGap = "0.2rem";
  const childrenHeight = `calc((${suboptheight} * ${childrenAmount}) + ${halfGap})`;

  return (
    <ASMOptionContainer>
      <ASMOptionWrapper
        accentColor={colors.accent}
        activeColor={colors.active}
        onClick={() => {
          selectOption(index);
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
                <IconLessLabel>{label[0]}</IconLessLabel>
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
        <ASMSubOptionsWrapper ChildrenHeight={childrenHeight} isOpen={isOpen}>
          {children}
        </ASMSubOptionsWrapper>
      )}
    </ASMOptionContainer>
  );
};

export default ASMOption;
