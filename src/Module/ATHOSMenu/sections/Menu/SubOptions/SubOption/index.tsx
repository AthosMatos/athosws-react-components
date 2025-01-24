import { animate } from "framer-motion";
import { useEffect, useMemo } from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ColoredDiv from "../../../../components/ColoredDiv";
import { DftOptWrapper } from "../../../../components/DftOptWrapper";
import { SubOptionProps } from "../../../../interfaces";
import { selectData, selectSubOption } from "../../../../redux/Selected";
import { AMState } from "../../../../redux/store";
import SubSubOptions from "../../SubSubOptions";

interface MenuSubOptionProps {
  id: string;
  subopt: SubOptionProps;
  isSelected: boolean;
}

const SubOption = ({ subopt, id, isSelected }: MenuSubOptionProps) => {
  useEffect(() => {
    const menuopt = document.getElementById(id);
    if (!menuopt || !subopt.subSubOpt || subopt.subSubOpt?.length == 0) return;

    animate(menuopt, {
      marginBottom: isSelected ? 4 : 0,
    });
  }, [isSelected]);

  const dispatch = useDispatch();
  const selectedOpt = () => {
    const hasSubOpts = subopt.subSubOpt?.length;
    if (!hasSubOpts) {
      dispatch(
        selectData({
          label: subopt.label,
          //icon
        })
      );
    }
    dispatch(selectSubOption(id));
  };

  const optColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.option);
  const subOptsColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.subOption);
  const colors = useMemo(() => {
    if (!subOptsColors) {
      return optColors;
    }
    return subOptsColors;
  }, [isSelected, subOptsColors, optColors]);

  return (
    <DftOptWrapper>
      <ColoredDiv selected={isSelected} id={id} onClick={selectedOpt} colors={colors} className="w-full rounded-md cursor-pointer">
        <BsFillGrid1X2Fill />
        {subopt.label}
      </ColoredDiv>
      <SubSubOptions show={isSelected} subSubOpts={subopt.subSubOpt} />
    </DftOptWrapper>
  );
};

export default SubOption;
