import { useMemo } from "react";
import { useSelector } from "react-redux";
import ColoredDiv from "../../../../components/ColoredDiv";
import { DftOptWrapper } from "../../../../components/DftOptWrapper";
import { getColorsWDefault } from "../../../../funcs";
import { SubOptionProps } from "../../../../interfaces";
import { useSelectedData } from "../../../../redux/Selected";
import { AMState } from "../../../../redux/store";
import SubSubOptions from "../../SubSubOptions";

interface MenuSubOptionProps extends SubOptionProps {
  index: number;
  optIndex: number;
}

const SubOption = (props: MenuSubOptionProps) => {
  const { index, label, icon, path, subSubOpts, specificColors, optIndex, onClick } = props;
  const optColors = useSelector((state: AMState) => state.AMPropsReducer.generalColors?.menu?.option);
  const subOptsColors = useSelector((state: AMState) => state.AMPropsReducer.generalColors?.menu?.subOption);
  const selectedSubOption = useSelector((state: AMState) => state.AMSelectedReducer.subOptionSelected);

  const id = useMemo(() => `${optIndex}-${index}`, [index, optIndex]);
  const selected = useSelector((state: AMState) => state.AMSelectedReducer.selectedData);
  const isSelected = useMemo(() => selectedSubOption === id, [id, selected, selectedSubOption]);

  const colors = useMemo(() => getColorsWDefault(optColors, subOptsColors), [subOptsColors, optColors]);

  const { selectedOpt } = useSelectedData();
  const click = () => {
    selectedOpt("subopt", id, label, subSubOpts, icon, path, !!onClick, onClick);
  };

  return (
    <DftOptWrapper>
      <ColoredDiv
        selected={isSelected}
        onClick={click}
        colors={specificColors || colors}
        className="w-[96%] rounded-md cursor-pointer p-2 gap-2"
      >
        {icon}
        {label}
      </ColoredDiv>
      <SubSubOptions optIndex={optIndex} subOptIndex={index} show={isSelected} subSubOpts={subSubOpts} />
    </DftOptWrapper>
  );
};

export default SubOption;
