import { useSelector } from "react-redux";
import { ADTState } from "../../../../../redux/store";

const useSelectors_ADTCellColumn = () => {
  const colConfig = useSelector((state: ADTState) => state.ADTPropsReducer.colConfig);
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);

  return {
    colConfig,

    persistPrimaryColumn,
  };
};

export default useSelectors_ADTCellColumn;
