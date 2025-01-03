import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTCell from "./ADTCell";

const ADTCells = () => {
  const filteredData = useSelector((state: ADTState) => state.ADTPagingReducer.filteredData);
  // const movingPage = useSelector((state: ADTState) => state.ADTPagingReducer.movingPage);

  /* <AnimatePresence mode={movingPage ? "wait" : "sync"}> */
  return filteredData?.map((row, rowIndex) => <ADTCell key={row.id} rowIndex={rowIndex} row={row} />);
};

export default ADTCells;
