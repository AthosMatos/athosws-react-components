import { BsFillGrid1X2Fill } from "react-icons/bs";
import { useSelector } from "react-redux";
import ColoredDiv from "../../components/ColoredDiv";
import { AMState } from "../../redux/store";

const Selected = ({ click }: { click: () => void }) => {
  const selected = useSelector((state: AMState) => state.AMSelectedReducer.selectedData);
  const colors = useSelector((state: AMState) => state.AMPropsReducer.colors?.selected);

  return (
    <ColoredDiv onClick={click} colors={colors} className="w-60 px-5 rounded-full cursor-pointer">
      <BsFillGrid1X2Fill />
      {selected?.label ?? "Select an option"}
    </ColoredDiv>
  );
};

export default Selected;
