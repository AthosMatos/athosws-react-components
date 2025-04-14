import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";

const useSelectors_ADTSelectedRowsToast = () => {
  const selectedRows = useSelector((state: ADTState) => state.ADTSelectReducer.selectedRows);
  const selectedRowsToastOpen = useSelector((state: ADTState) => state.ADTSelectReducer.selectedRowsToastOpen);
  const checkState = useSelector((state: ADTState) => state.ADTSelectReducer.checkState);

  const tableStyle = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle);
  const selectedRowsTooltip = useSelector((state: ADTState) => state.ADTPropsReducer.selectedRowsToast);
  const data = useSelector((state: ADTState) => state.ADTPropsReducer.data);
  const tableName = useSelector((state: ADTState) => state.ADTPropsReducer).tableName;

  return {
    selectedRows,
    selectedRowsToastOpen,
    checkState,
    tableStyle,
    selectedRowsTooltip,
    data,
    tableName,
  };
};

export default useSelectors_ADTSelectedRowsToast;
