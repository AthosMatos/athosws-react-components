import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";

const useSelectors_ADTNav = () => {
  const totalItems = useSelector((state: ADTState) => state.ADTCustomStatesReducer.totalItems);
  const page = useSelector((state: ADTState) => state.ADTPagingReducer.page);
  const pageSize = useSelector((state: ADTState) => state.ADTPagingReducer.pageSize);
  const movingPage = useSelector((state: ADTState) => state.ADTPagingReducer.movingPage);
  const data = useSelector((state: ADTState) => state.ADTPropsReducer.data);

  return {
    totalItems,
    page,
    pageSize,
    movingPage,
    data,
  };
};

export default useSelectors_ADTNav;
