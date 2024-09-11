import { useADTContext } from "../../context";
import ADTCell from "./ADTCell";

const ADTCells = () => {
  const {
    props: { data },
  } = useADTContext();

  return data.map((row, rowIndex) => <ADTCell row={row} rowIndex={rowIndex} />);
};

export default ADTCells;
