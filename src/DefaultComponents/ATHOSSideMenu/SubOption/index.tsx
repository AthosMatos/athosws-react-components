import { useATHOSSideMenu } from "../context";
import { ASMSubOptionProps } from "../interfaces";
import { ASMSubOptionLabel, ASMSubOptionWrapper } from "../styled";

const ASMSubOption = ({ label, index, parentIndex }: ASMSubOptionProps) => {
  const {
    selectedDataTrack,
    selectSubOption,
    props: { colors },
  } = useATHOSSideMenu();
  const subopts = selectedDataTrack[parentIndex].subOptions;
  const isOpen = subopts && subopts[index].show;

  return (
    <ASMSubOptionWrapper
      accentColor={colors.accent}
      activeColor={colors.active}
      clicked={isOpen}
      onClick={() => {
        selectSubOption(parentIndex, index);
      }}
    >
      <ASMSubOptionLabel>{label}</ASMSubOptionLabel>
    </ASMSubOptionWrapper>
  );
};

export default ASMSubOption;
