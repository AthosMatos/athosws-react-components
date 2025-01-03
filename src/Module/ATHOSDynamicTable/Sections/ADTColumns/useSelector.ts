import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";

const useSelecetor_ADTColumns = () => {
  const columns = useSelector((state: ADTState) => state.ADTPropsReducer.columns);

  const colsTRId = useSelector((state: ADTState) => state.ADTCustomStatesReducer.colsTRId);

  const colH = useSelector((state: ADTState) => state.ADTCustomStatesReducer.colH);

  return {
    columns,
    colsTRId,
    colH,
  };
};

export default useSelecetor_ADTColumns;
