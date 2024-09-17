import { useATHOSSideMenu } from "../../../context/context";
import { ASMSubOptionProps } from "./interfaces";
import { ASMSubOptionLabel, ASMSubOptionWrapper } from "./styled";

const ASMSubOption = ({ parentId, subopt }: ASMSubOptionProps) => {
  const {
    selectSubOption,
    props: { colors },
    editing,
  } = useATHOSSideMenu();
  const isOpen = subopt.show;

  return (
    <ASMSubOptionWrapper
      editing={editing}
      accentColor={colors.accent}
      activeColor={colors.active}
      clicked={isOpen}
      onClick={() => {
        selectSubOption(parentId, subopt.id);
      }}
    >
      <ASMSubOptionLabel>{subopt.label}</ASMSubOptionLabel>
    </ASMSubOptionWrapper>
  );
};

export default ASMSubOption;
