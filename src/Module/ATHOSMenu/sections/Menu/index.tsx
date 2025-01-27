import { useSelector } from "react-redux";
import ColoredDiv from "../../components/ColoredDiv";
import { AMState } from "../../redux/store";
import MenuOption from "./MenuOption";

const Menu = () => {
  const colors = useSelector((state: AMState) => state.AMPropsReducer.colors?.menu);
  const options = useSelector((state: AMState) => state.AMPropsReducer.options);

  return (
    <ColoredDiv scaleAnim={false} specificColors={colors} className="w-full rounded-lg flex-col p-2 gap-1">
      {options.map((opt, index) => {
        return <MenuOption key={`${opt.label}-${index}`} {...opt} index={index} />;
      })}
    </ColoredDiv>
  );
};

export default Menu;
