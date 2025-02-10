import { useSelector } from "react-redux";
import { ADTState } from "../../../../redux/store";

const useSelectors_ADTCellCheckBox = () => {
  const paddingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);
  const paddingBetweenColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenColumns);
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);
  const tableStyle = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle);

  const checkState = useSelector((state: ADTState) => state.ADTSelectReducer.checkState);
  const selectedRows = useSelector((state: ADTState) => state.ADTSelectReducer.selectedRows);
  const pageSize = useSelector((state: ADTState) => state.ADTFilteringReducer).pageSize;
  const page = useSelector((state: ADTState) => state.ADTFilteringReducer).page;

  return {
    paddingBetweenCells,
    paddingBetweenColumns,
    persistPrimaryColumn,
    tableStyle,
    checkState,
    selectedRows,
    pageSize,
    page,
  };
};

export default useSelectors_ADTCellCheckBox;
