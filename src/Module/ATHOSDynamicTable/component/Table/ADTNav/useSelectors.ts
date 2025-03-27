import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";

const useSelectors_ADTNav = () => {
  const totalItems = useSelector((state: ADTState) => state.ADTCustomStatesReducer.totalItems);
  const page = useSelector((state: ADTState) => state.ADTFilteringReducer.page);
  const pageSize = useSelector((state: ADTState) => state.ADTFilteringReducer.pageSize);
  const data = useSelector((state: ADTState) => state.ADTPropsReducer.data);

  return {
    totalItems,
    page,
    pageSize,
    data,
  };
};

export default useSelectors_ADTNav;
