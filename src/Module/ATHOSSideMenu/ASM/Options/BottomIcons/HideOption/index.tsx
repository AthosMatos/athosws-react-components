import { ReactNode } from "react";
import { IconType } from "react-icons";
import { useATHOSSideMenu } from "../../../../context/context";
import {
  ASMBottomIconOptionWrapper,
  ASMIconWrapper,
  defaulIconSize,
} from "../../../../styled";

interface ASMOptionProps {
  Icon: IconType | ReactNode;
  iconSize?: string | number;
  label: string;
}

const ASMHideOption = ({ Icon, label, iconSize }: ASMOptionProps) => {
  const {
    props: { colors },
    hideMenu,
    setHideMenu,
  } = useATHOSSideMenu();
  return (
    <ASMBottomIconOptionWrapper
      title={label}
      accentColor={colors.accent}
      activeColor={colors.active}
      onClick={() => {
        setHideMenu && setHideMenu(!hideMenu);
      }}
    >
      <ASMIconWrapper iconSize={defaulIconSize}>
        {typeof Icon === "function" ? (
          <Icon
            style={{
              pointerEvents: "none",
              color: colors.accent,
            }}
            size={iconSize ?? defaulIconSize}
          />
        ) : (
          Icon
        )}
      </ASMIconWrapper>
    </ASMBottomIconOptionWrapper>
  );
};

export default ASMHideOption;
