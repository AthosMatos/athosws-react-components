import { useATHOSSideMenu } from "../../../context/context";
import { ASMSubSubOptionProps } from "./interfaces";

import { ASMSubSubOptionLabel, ASMSubSubOptionWrapper } from "./styled";

const ASMSubSubOption = ({ optId, subOptId, subopt }: ASMSubSubOptionProps) => {
  const { selectSubSubOption } = useATHOSSideMenu();
  const isOpen = subopt.selected;

  return (
    <ASMSubSubOptionWrapper
      colorConfig={subopt.colorConfig}
      label={subopt.label}
      clicked={isOpen}
      onClick={() => {
        selectSubSubOption(optId, subOptId, subopt.id);
      }}
    >
      <ASMSubSubOptionLabel>{subopt.label}</ASMSubSubOptionLabel>
    </ASMSubSubOptionWrapper>
  );
};

export default ASMSubSubOption;
