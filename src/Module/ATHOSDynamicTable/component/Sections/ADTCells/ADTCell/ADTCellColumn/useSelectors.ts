import { useSelector } from "react-redux";
import { ADTState } from "../../../../redux/store";

const useSelectors_ADTCellColumn = () => {
  const columns = useSelector((state: ADTState) => state.ADTFilteringReducer.filteredColumns);
  const colConfig = useSelector((state: ADTState) => state.ADTPropsReducer.colConfig);
  const paddingBetweenColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenColumns);
  const paddingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);

  return {
    columns,
    colConfig,
    paddingBetweenColumns,
    paddingBetweenCells,
    persistPrimaryColumn,
  };
};

export default useSelectors_ADTCellColumn;
