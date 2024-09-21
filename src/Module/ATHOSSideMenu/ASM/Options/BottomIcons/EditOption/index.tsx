import { IconType } from "react-icons";
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
}

const ASMEditOption = ({ Icon, label, iconSize }: ASMOptionProps) => {
  const {
    props: { colors },
    setEditing,
    editing,
  } = useATHOSSideMenu();
  return (
    <ASMBottomIconOptionWrapper
      title={label}
      /* accentColor={colors.accent}
      activeColor={colors.active} */
      onClick={() => {
        setEditing(!editing);
      }}
    >
      <ASMIconWrapper iconSize={defaulIconSize}>
        <Icon
          style={{
            pointerEvents: "none",
            //color: colors.accent,
          }}
          size={iconSize ?? defaulIconSize}
        />
      </ASMIconWrapper>
    </ASMBottomIconOptionWrapper>
  );
};

export default ASMEditOption;
