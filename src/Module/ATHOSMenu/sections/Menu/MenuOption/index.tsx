import { animate } from "framer-motion";
import { useEffect } from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ColoredDiv from "../../../components/ColoredDiv";
import { SubOptionProps } from "../../../interfaces";
import { selectData, selectOption } from "../../../redux/Selected";
import { AMState } from "../../../redux/store";
import SubOptions from "../SubOptions";

interface MenuOptionProps {
  id: string;
  label: string;
  subOpts?: SubOptionProps[];
  isSelected: boolean;
}
const MenuOption = ({ label, subOpts, isSelected, id }: MenuOptionProps) => {
  const optsColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.option);
  const colors = isSelected ? optsColors?.clicked : optsColors?.normal;

  useEffect(() => {
    const menuopt = document.getElementById(id);
    if (!menuopt || !subOpts || subOpts?.length == 0) return;

    animate(menuopt, {
      marginBottom: isSelected ? 4 : 0,
    });
  }, [isSelected]);

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
    <div className="w-full flex flex-col items-end">
      <ColoredDiv id={id} onClick={selectedOpt} colors={colors} className="w-full rounded-md cursor-pointer">
        <BsFillGrid1X2Fill />
        {label}
      </ColoredDiv>
      <SubOptions subOpts={subOpts} show={isSelected} />
    </div>
  );
};

export default MenuOption;
