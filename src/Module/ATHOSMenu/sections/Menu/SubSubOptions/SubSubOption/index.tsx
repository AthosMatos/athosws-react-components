import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import ColoredDiv from "../../../../components/ColoredDiv";
import { DftOptWrapper } from "../../../../components/DftOptWrapper";
import { SubSubOptionProps } from "../../../../interfaces";
import { useSelectedData } from "../../../../redux/Selected";
import { AMState } from "../../../../redux/store";

interface MenuSubSsubOptionProps extends SubSubOptionProps {
  index: number;
  optIndex: number;
  subOptIndex: number;
}

const SubSubOption = (props: MenuSubSsubOptionProps) => {
  const { index, label, icon, path, optIndex, subOptIndex } = props;
  const subsubOptsColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.subSubOption);
  const subOptsColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.subOption);
  const optColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.option);
  const selectedSubSubOption = useSelector((state: AMState) => state.AMSelectedReducer.subSubOptionSelected);

  const id = useMemo(() => `${optIndex}-${subOptIndex}-${index}`, [index, optIndex, subOptIndex]);
  const isSelected = useMemo(() => selectedSubSubOption === id, [id, selectedSubSubOption]);
  const colors = useMemo(() => {
    if (!subsubOptsColors) {
      if (!subOptsColors) {
        return optColors;
      }
      return subOptsColors;
    }
    return subsubOptsColors;
  }, [subsubOptsColors, subOptsColors, subsubOptsColors]);

  const { selectedOpt } = useSelectedData();

  const click = () => {
    selectedOpt("subsubopt", id, label, undefined, icon, path, true);
  };

  useEffect(() => {
    console.log("selectedSubSubOption", selectedSubSubOption, "id", id);
  }, [selectedSubSubOption]);

  return (
    <DftOptWrapper className="pt-0 first:pt-1 pb-0 last:pb-1">
      <ColoredDiv selected={isSelected} onClick={click} colors={colors} className="w-[92%] rounded-md cursor-pointer">
        {icon}
        {label}
      </ColoredDiv>
    </DftOptWrapper>
  );
};

export default SubSubOption;
