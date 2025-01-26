import { useMemo } from "react";
import { useSelector } from "react-redux";
import ColoredDiv from "../../../../components/ColoredDiv";
import { DftOptWrapper } from "../../../../components/DftOptWrapper";
import { SubOptionProps } from "../../../../interfaces";
import { useSelectedData } from "../../../../redux/Selected";
import { AMState } from "../../../../redux/store";
import SubSubOptions from "../../SubSubOptions";

interface MenuSubOptionProps extends SubOptionProps {
  index: number;
  optIndex: number;
}

const SubOption = (props: MenuSubOptionProps) => {
  const { index, label, icon, path, subSubOpts, optIndex } = props;
  const optColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.option);
  const subOptsColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.subOption);
  const selectedSubOption = useSelector((state: AMState) => state.AMSelectedReducer.subOptionSelected);

  const id = useMemo(() => `${optIndex}-${index}`, [index, optIndex]);
  const isSelected = useMemo(() => selectedSubOption === id, [id, selectedSubOption]);
  const colors = useMemo(() => {
    if (!subOptsColors) {
      return optColors;
    }
    return subOptsColors;
  }, [subOptsColors, optColors]);

  const { selectedOpt } = useSelectedData();
  const click = () => {
    selectedOpt("subopt", id, label, subSubOpts, icon, path);
  };

  return (
    <DftOptWrapper>
      <ColoredDiv selected={isSelected} onClick={click} colors={colors} className="w-[96%] rounded-md cursor-pointer">
        {icon}
        {label}
      </ColoredDiv>
      <SubSubOptions optIndex={optIndex} subOptIndex={index} show={isSelected} subSubOpts={subSubOpts} />
    </DftOptWrapper>
  );
};

export default SubOption;
