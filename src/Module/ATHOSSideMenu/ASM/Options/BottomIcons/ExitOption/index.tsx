import { IconType } from "react-icons";
import { ATHOSColors } from "../../../../../colors/colors";
import { useATHOSSideMenu } from "../../../../context/context";
import {
  ASMBottomIconOptionWrapper,
  ASMIconWrapper,
  defaulIconSize,
} from "../../../../styled";

interface ASMOptionProps {
  Icon: IconType;
  iconSize?: string | number;
  label: string;
  onClick?: () => void;
}

const ASMExitOption = ({ Icon, label, iconSize, onClick }: ASMOptionProps) => {
  const {
    props: { colors },
  } = useATHOSSideMenu();
  return (
    <ASMBottomIconOptionWrapper
      title={label}
      accentColor={colors.accent}
      activeColor={colors.active}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <ASMIconWrapper iconSize={defaulIconSize}>
        <Icon
          style={{
            pointerEvents: "none",
            color: ATHOSColors.red.default,
          }}
          size={iconSize ?? defaulIconSize}
        />
      </ASMIconWrapper>
    </ASMBottomIconOptionWrapper>
  );
};

export default ASMExitOption;
