import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";

const useSelecetor_ADTColumns = () => {
  const filteredColumns = useSelector((state: ADTState) => state.ADTFilteringReducer.filteredColumns);

  const colsTRId = useSelector((state: ADTState) => state.ADTCustomStatesReducer.colsTRId);

  const colH = useSelector((state: ADTState) => state.ADTCustomStatesReducer.colH);

  return {
    filteredColumns,
    colsTRId,
    colH,
  };
};

export default useSelecetor_ADTColumns;
