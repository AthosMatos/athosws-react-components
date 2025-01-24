import { BsFillGrid1X2Fill } from "react-icons/bs";
import { useSelector } from "react-redux";
import ColoredDiv from "../../components/ColoredDiv";
import { AMState } from "../../redux/store";

interface SelectedProps {
  click: () => void;
  aRef: any;
}

const Selected = ({ click, aRef }: SelectedProps) => {
  const selected = useSelector((state: AMState) => state.AMSelectedReducer.selectedData);
  const colors = useSelector((state: AMState) => state.AMPropsReducer.colors?.selected);

  return (
    <ColoredDiv aRef={aRef} onClick={click} specificColors={colors} className="w-full px-5 rounded-full cursor-pointer">
      {selected?.icon}
      <p>{selected?.label ?? "Select an option"}</p>
    </ColoredDiv>
  );
};

export default Selected;
