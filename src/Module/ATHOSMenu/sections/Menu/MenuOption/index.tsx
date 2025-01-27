import { useMemo } from "react";
import { useSelector } from "react-redux";
import ColoredDiv from "../../../components/ColoredDiv";
import { DftOptWrapper } from "../../../components/DftOptWrapper";
import { OptionProps } from "../../../interfaces";
import { useSelectedData } from "../../../redux/Selected";
import { AMState } from "../../../redux/store";
import SubOptions from "../SubOptions";

interface MenuOptionProps extends OptionProps {
  index: number;
}
const MenuOption = (props: MenuOptionProps) => {
  const { index, label, subOpts, icon, path, onClick } = props;
  const optsColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.option);
  const selectedOption = useSelector((state: AMState) => state.AMSelectedReducer.optionSelected);

  const id = useMemo(() => index.toString(), [index]);
  const isSelected = useMemo(() => selectedOption === id, [id, selectedOption]);

  const { selectedOpt } = useSelectedData();

  const click = () => {
    selectedOpt("opt", id, label, subOpts, icon, path, !!onClick, onClick);
  };

  return (
    <DftOptWrapper className="gap-1">
      <ColoredDiv selected={isSelected} onClick={click} colors={optsColors} className="w-full rounded-md cursor-pointer p-2 gap-2">
        {icon}
        {label}
      </ColoredDiv>
      <SubOptions optIndex={index} subOpts={subOpts} show={isSelected} />
    </DftOptWrapper>
  );
};

export default MenuOption;
