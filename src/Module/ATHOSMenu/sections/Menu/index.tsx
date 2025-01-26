import { useSelector } from "react-redux";
import ColoredDiv from "../../components/ColoredDiv";
import { AMState } from "../../redux/store";
import MenuOption from "./MenuOption";

const Menu = () => {
  const colors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu);
  const options = useSelector((state: AMState) => state.AMPropsReducer.options);

  return (
    <ColoredDiv scaleAnim={false} specificColors={colors} className="w-full !p-0 !px-[0.13rem] !gap-0 rounded-lg flex-col !py-[0.12rem]">
      {options.map((opt, index) => {
        return <MenuOption key={`${opt.label}-${index}`} {...opt} index={index} />;
      })}
    </ColoredDiv>
  );
};

export default Menu;
