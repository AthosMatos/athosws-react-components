import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";

const useSelector_ADTCol = () => {
  const paddingBetweenColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenColumns);
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);
  const tableStyle = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle);
  const colConfig = useSelector((state: ADTState) => state.ADTPropsReducer.colConfig);

  return {
    paddingBetweenColumns,
    persistPrimaryColumn,
    tableStyle,
    colConfig,
  };
};

export default useSelector_ADTCol;
