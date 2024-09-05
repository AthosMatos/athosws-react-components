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
  } = useATHOSSideMenu();

  const hasChildren = !(children == undefined || children == null);
  const isOpen = selectedDataTrack[index].show;
  const hasSelectedChildren = selectedDataTrack[index].subOptions?.some(
    (sub) => sub.show
  );
  const childrenAmount = (children as any)?.length;

  //calculation of the height of the children container

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
          {Icon && (
            <ASMIconWrapper iconSize={defaulIconSize}>
              <Icon
                style={{
                  pointerEvents: "none",
                }}
                size={iconSize ?? defaulIconSize}
              />
            </ASMIconWrapper>
          )}

          <ASMOptionLabel>{label}</ASMOptionLabel>
        </ASMLabelIconWrapper>

        {children && <ASMArrowDown clicked={isOpen} />}
      </ASMOptionWrapper>

      {children && (
        <ASMSubOptionsWrapper ChildrenHeight={childrenHeight} isOpen={isOpen}>
          {children}
        </ASMSubOptionsWrapper>
      )}
    </ASMOptionContainer>
  );
};

export default ASMOption;
