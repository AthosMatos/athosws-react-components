import { useDispatch, useSelector } from "react-redux";
import { ADTState } from "../store";
import { PageSizesType } from "./interfaces";
import {
  setFilteredData,
  setGoingForward,
  setPage,
  setPageSize,
  setSearchFilter,
} from "./provider";

export const useADTPaging = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: ADTState) => state.ADTPropsReducer);
  const { page, totalPages, canGoBack, canGoForward, pageSize, filteredData } =
    useSelector((state: ADTState) => state.ADTFilteredPropsReducer);

  const filterBySearch = (search: string) => {
    dispatch(setSearchFilter(search));
    const filtered = data
      ?.filter((row) => {
        return Object.values(row).some((value: any) => {
          return value.toString().toLowerCase().includes(search.toLowerCase());
        });
      })
      .slice(0, pageSize);
    dispatch(setFilteredData(filtered));
  };

  const movePage = (to: "next" | "prev" | number) => {
    if (typeof to === "number" && to > 0 && to <= totalPages && to !== page) {
      dispatch(setPage(to));

      if (to < page) {
        dispatch(setGoingForward(false));
      }
      if (to > page) {
        dispatch(setGoingForward(true));
      }

      return;
    }
    if ((to === "next" && !canGoForward) || (to === "prev" && !canGoBack)) {
      return;
    }
    if (to === "next" && page * pageSize < data?.length) {
      dispatch(setPage(page + 1));
      dispatch(setGoingForward(true));
    } else if (to === "prev" && page > 1) {
      dispatch(setPage(page - 1));
      dispatch(setGoingForward(false));
    }
  };
  const changePageSize = (size: PageSizesType) => {
    dispatch(setPageSize(size));
  };

  return {
    filterBySearch,
    movePage,
    changePageSize,
  };
};
