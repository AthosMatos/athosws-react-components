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
  const dispatch = useDispatch();
  const selectedOpt = () => {
    const hasSubOpts = subopt.subSubOpts?.length;
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
      <ColoredDiv selected={isSelected} onClick={selectedOpt} colors={colors} className="w-full rounded-md cursor-pointer">
        {subopt.icon}
        {subopt.label}
      </ColoredDiv>
      <SubSubOptions show={isSelected} subSubOpts={subopt.subSubOpts} />
    </DftOptWrapper>
  );
};

export default SubOption;
