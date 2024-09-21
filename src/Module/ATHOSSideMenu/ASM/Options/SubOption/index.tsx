import { useATHOSSideMenu } from "../../../context/context";
import { ASMSubOptionProps } from "./interfaces";
import { ASMSubOptionLabel, ASMSubOptionWrapper } from "./styled";

const ASMSubOption = ({ parentId, subopt }: ASMSubOptionProps) => {
  const {
    selectSubOption,
    props: { colors },
  } = useATHOSSideMenu();
  const isOpen = subopt.selected;

  return (
    <ASMSubOptionWrapper
      colorConfig={subopt.colorConfig}
      label={subopt.label}
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
