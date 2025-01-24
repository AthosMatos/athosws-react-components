import { animate } from "framer-motion";
import { useEffect } from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ColoredDiv from "../../../components/ColoredDiv";
import { DftOptWrapper } from "../../../components/DftOptWrapper";
import { DefaultOptProps, SubOptionProps } from "../../../interfaces";
import { selectData, selectOption } from "../../../redux/Selected";
import { AMState } from "../../../redux/store";
import SubOptions from "../SubOptions";
import { DefaultOptI } from "../../../../ATHOSSideMenu/interfaces";

interface MenuOptionProps extends DefaultOptProps {
  id: string;
  subOpts?: SubOptionProps[];
  isSelected: boolean;
}
const MenuOption = ({ label, subOpts, isSelected, id, icon }: MenuOptionProps) => {
  const optsColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.option);

  const dispatch = useDispatch();
  const selectedOpt = () => {
    const hasSubOpts = subOpts?.length;
    if (!hasSubOpts) {
      dispatch(
        selectData({
          label,
          //icon
        })
      );
    }
    dispatch(selectOption(id));
  };

  return (
    <DftOptWrapper>
      <ColoredDiv selected={isSelected} onClick={selectedOpt} colors={optsColors} className="w-full rounded-md cursor-pointer">
        {icon}
        {label}
      </ColoredDiv>
      <SubOptions subOpts={subOpts} show={isSelected} />
    </DftOptWrapper>
  );
};

export default MenuOption;
