import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTCell from "./ADTCell";

const ADTCells = () => {
  const { filteredData } = useSelector(
    (state: ADTState) => state.ADTPagingReducer
  );
  return filteredData?.map((row, rowIndex) => (
    <ADTCell key={row.id} rowIndex={rowIndex} row={row} />
  ));
};

export default ADTCells;
