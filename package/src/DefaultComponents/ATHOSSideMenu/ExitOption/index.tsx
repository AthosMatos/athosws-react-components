import { IconType } from "react-icons";
import { ATHOSColors } from "../../colors/colors";
import { useATHOSSideMenu } from "../context";
import {
  ASBIconWrapper,
  ASBLabelIconWrapper,
  ASBOptionLabel,
  ASBOptionWrapper,
  defaulIconSize,
} from "../styled";

interface ASBOptionProps {
  Icon: IconType;
  iconSize?: string | number;
  label: string;
  onClick?: () => void;
}

const ASBExitOption = ({
  Icon,
  label,

  iconSize,
  onClick,
}: ASBOptionProps) => {
  const {
    props: { colors },
  } = useATHOSSideMenu();
  return (
    <ASBOptionWrapper
      accentColor={colors.accent}
      activeColor={colors.active}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <ASBLabelIconWrapper>
        <ASBIconWrapper iconSize={defaulIconSize}>
          <Icon
            style={{
              pointerEvents: "none",
              color: ATHOSColors.red.default,
            }}
            size={iconSize ?? defaulIconSize}
          />
        </ASBIconWrapper>

        <ASBOptionLabel>{label}</ASBOptionLabel>
      </ASBLabelIconWrapper>
    </ASBOptionWrapper>
  );
};

export default ASBExitOption;
