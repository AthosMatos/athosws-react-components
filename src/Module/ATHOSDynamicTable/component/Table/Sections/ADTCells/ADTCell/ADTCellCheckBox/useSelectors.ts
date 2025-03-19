import { useSelector } from "react-redux";
import { ADTState } from "../../../../../redux/store";

const useSelectors_ADTCellCheckBox = () => {
  const paddingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);
  const tableStyle = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle);

  const checkState = useSelector((state: ADTState) => state.ADTSelectReducer.checkState);

  return {
    paddingBetweenCells,
    persistPrimaryColumn,
    tableStyle,
    checkState,
  };
};

export default useSelectors_ADTCellCheckBox;
