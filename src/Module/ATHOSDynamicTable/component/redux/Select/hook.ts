import { useDispatch, useSelector } from "react-redux";
import { ADTState } from "../store";
import { setCheckState, setSelectedPages, setSelectedRows, setSelectedRowsToastOpen } from "./provider";

export const useADTSelect = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector((state: ADTState) => state.ADTCustomStatesReducer.totalItems);
  const page = useSelector((state: ADTState) => state.ADTFilteringReducer.page);
  const pageSize = useSelector((state: ADTState) => state.ADTFilteringReducer.pageSize);
  const selectedRows = useSelector((state: ADTState) => state.ADTSelectReducer.selectedRows);
  const checkState = useSelector((state: ADTState) => state.ADTSelectReducer.checkState);
  const data = useSelector((state: ADTState) => state.ADTPropsReducer.data);
  const selectedPages = useSelector((state: ADTState) => state.ADTSelectReducer.selectedPages);
  const checkAll = () => {
    dispatch(setSelectedRows(data.map((row, i) => row.uniqueId)));
    dispatch(setCheckState(1));
  };

  const uncheckAll = () => {
    const newSelPages = selectedPages.filter((p) => p !== page);
    if (selectedPages.length <= 1) {
      dispatch(setSelectedRows([]));
    } else {
      const newSelectedRows = newSelPages.map((p) => data.slice((p - 1) * pageSize, p * pageSize).map((row, i) => row.uniqueId)).flat();
      dispatch(setSelectedRows(newSelectedRows));
    }
    dispatch(setCheckState(0));
    dispatch(setSelectedPages(newSelPages));
  };

  const pageCheck = () => {
    const currPageA = Math.abs((page - 1) * pageSize - totalItems);

    const currPageAmount = currPageA < pageSize ? currPageA : pageSize;

    /*  const divAmount = currPageAmount % pageSize;
    console.log("pageCheck", divAmount); */
    const selPages = [...selectedPages, page];
    dispatch(setSelectedPages(selPages));

    const newSelRows = selPages
      .map((p) => data.slice((p - 1) * pageSize, (p - 1) * pageSize + currPageAmount).map((row, i) => row.uniqueId))
      .flat();

    dispatch(setSelectedRows(newSelRows));
    dispatch(setCheckState({ pages: [...selectedPages, page] }));
  };

  const checkAllButtonClick = () => {
    if (checkState === 0) {
      checkAll();
    } else if (checkState === 1) {
      pageCheck();
    } else {
      uncheckAll();
    }
  };

  const checkCellClick = (id: string) => {
    // console.log("row", row);
    const newSelectedRows = selectedRows.includes(id) ? selectedRows.filter((r) => r !== id) : [...selectedRows, id];
    dispatch(setSelectedRows(newSelectedRows));
  };

  const openSelectedRowsToast = () => {
    dispatch(setSelectedRowsToastOpen(true));
  };
  const closeSelectedRowsToast = () => {
    dispatch(setSelectedRowsToastOpen(false));
  };

  return {
    uncheckAll,
    checkCellClick,
    checkAllButtonClick,
    openSelectedRowsToast,
    closeSelectedRowsToast,
  };
};
