import { useSelector } from "react-redux";
import { ADTState } from "../../../../../redux/store";

const useSelectors_ADTCellColumn = () => {
  const colConfig = useSelector((state: ADTState) => state.ADTPropsReducer.colConfig);
  const paddingBetweenColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenColumns);
  const paddingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);

  return {
    colConfig,
    paddingBetweenColumns,
    paddingBetweenCells,
    persistPrimaryColumn,
  };
};

export default useSelectors_ADTCellColumn;
