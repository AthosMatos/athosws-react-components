import { useMemo } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import ColoredDiv from "../../components/ColoredDiv";
import { AMState } from "../../redux/store";
import MenuOption from "./MenuOption";

const Menu = () => {
  const colors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu);
  const options = useSelector((state: AMState) => state.AMPropsReducer.options);
  const selectedOption = useSelector((state: AMState) => state.AMSelectedReducer.optionSelected);

  return (
    <ColoredDiv scaleAnim={false} specificColors={colors} className="w-full !p-0 !gap-0 rounded-lg flex-col !py-[0.12rem]">
      {options.map((opt) => {
        const id = useMemo(() => `${opt.label}-${v4()}`, []);
        return (
          <MenuOption id={id} isSelected={selectedOption === id} key={opt.label} label={opt.label} icon={opt.icon} subOpts={opt.subOpts} />
        );
      })}
    </ColoredDiv>
  );
};

export default Menu;
