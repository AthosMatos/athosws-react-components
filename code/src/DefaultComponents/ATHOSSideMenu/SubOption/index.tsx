import { useATHOSSideMenu } from "../context";
import { ASBSubOptionProps } from "../interfaces";
import { ASBOptionLabel, ASBSubOptionWrapper } from "../styled";

const ASBSubOption = ({ label, index, parentIndex }: ASBSubOptionProps) => {
  const {
    selectedDataTrack,
    selectSubOption,
    props: { colors },
  } = useATHOSSideMenu();
  const subopts = selectedDataTrack[parentIndex].subOptions;
  const isOpen = subopts && subopts[index].show;

  return (
    <ASBSubOptionWrapper
      accentColor={colors.accent}
      activeColor={colors.active}
      clicked={isOpen}
      onClick={() => {
        selectSubOption(parentIndex, index);
      }}
    >
      <ASBOptionLabel>{label}</ASBOptionLabel>
    </ASBSubOptionWrapper>
  );
};

export default ASBSubOption;
