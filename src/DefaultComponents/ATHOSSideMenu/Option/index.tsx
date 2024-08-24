import { useATHOSSideMenu } from "../context";
import { ASBOptionProps } from "../interfaces";
import {
  ASBArrowDown,
  ASBIconWrapper,
  ASBLabelIconWrapper,
  ASBOptionContainer,
  ASBOptionLabel,
  ASBOptionWrapper,
  ASBSubOptionsWrapper,
  defaulIconSize,
  suboptheight,
} from "../styled";

const ASBOption = ({
  index,
  Icon,
  label,
  children,
  iconSize,
}: ASBOptionProps) => {
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
    <ASBOptionContainer>
      <ASBOptionWrapper
        accentColor={colors.accent}
        activeColor={colors.active}
        onClick={() => {
          selectOption(index);
        }}
        hasSelectedChildren={!hasSelectedChildren && hasChildren}
        hasChildren={hasChildren}
        clicked={isOpen || hasSelectedChildren}
      >
        <ASBLabelIconWrapper>
          <ASBIconWrapper iconSize={defaulIconSize}>
            <Icon
              style={{
                pointerEvents: "none",
              }}
              size={iconSize ?? defaulIconSize}
            />
          </ASBIconWrapper>

          <ASBOptionLabel>{label}</ASBOptionLabel>
        </ASBLabelIconWrapper>

        {children && <ASBArrowDown clicked={isOpen} />}
      </ASBOptionWrapper>

      {children && (
        <ASBSubOptionsWrapper ChildrenHeight={childrenHeight} isOpen={isOpen}>
          {children}
        </ASBSubOptionsWrapper>
      )}
    </ASBOptionContainer>
  );
};

export default ASBOption;
