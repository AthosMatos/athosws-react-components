import { useMemo } from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ColoredDiv from "../../../../components/ColoredDiv";
import { DftOptWrapper } from "../../../../components/DftOptWrapper";
import { SubSubOptionProps } from "../../../../interfaces";
import { selectData, selectSubSubOption } from "../../../../redux/Selected";
import { AMState } from "../../../../redux/store";

interface MenuSubSsubOptionProps {
  subsubopt: SubSubOptionProps;
  isSelected: boolean;
  id: string;
}

const SubSubOption = ({ subsubopt, id, isSelected }: MenuSubSsubOptionProps) => {
  const subsubOptsColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.subSubOption);
  const subOptsColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.subOption);
  const optColors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu?.option);
  const colors = useMemo(() => {
    if (!subsubOptsColors) {
      if (!subOptsColors) {
        return optColors;
      }
      return subOptsColors;
    }
    return subsubOptsColors;
  }, [isSelected, subsubOptsColors, subOptsColors, subsubOptsColors]);

  const dispatch = useDispatch();
  const selectedOpt = () => {
    dispatch(
      selectData({
        label: subsubopt.label,
        //icon
      })
    );
    dispatch(selectSubSubOption(id));
  };

  return (
    <DftOptWrapper className="p-0 px-1 last:pb-1">
      <ColoredDiv selected={isSelected} onClick={selectedOpt} colors={colors} className="w-full rounded-md cursor-pointer">
        <BsFillGrid1X2Fill />
        {subsubopt.label}
      </ColoredDiv>
    </DftOptWrapper>
  );
};

export default SubSubOption;
