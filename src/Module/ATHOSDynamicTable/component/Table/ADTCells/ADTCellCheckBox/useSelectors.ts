import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";

const useSelectors_ADTCellCheckBox = () => {
  const paddingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);

  const checkState = useSelector((state: ADTState) => state.ADTSelectReducer.checkState);

  return {
    paddingBetweenCells,
    persistPrimaryColumn,

    checkState,
  };
};

export default useSelectors_ADTCellCheckBox;
