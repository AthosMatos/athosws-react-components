import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";

const useSelectors_Info = () => {
  const pageSize = useSelector((state: ADTState) => state.ADTPagingReducer.pageSize);
  const tableName = useSelector((state: ADTState) => state.ADTPropsReducer.tableName);
  const totalItems = useSelector((state: ADTState) => state.ADTCustomStatesReducer.totalItems);

  return {
    pageSize,
    tableName,
    totalItems,
  };
};

export default useSelectors_Info;
