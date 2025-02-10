import { useDispatch, useSelector } from "react-redux";
import { ADTState } from "../store";
import { setCheckState, setSelectedRows, setSelectedRowsToastOpen } from "./provider";

export const useADTSelect = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector((state: ADTState) => state.ADTCustomStatesReducer.totalItems);
  const page = useSelector((state: ADTState) => state.ADTFilteringReducer.page);
  const pageSize = useSelector((state: ADTState) => state.ADTFilteringReducer.pageSize);
  const selectedRows = useSelector((state: ADTState) => state.ADTSelectReducer.selectedRows);
  const checkState = useSelector((state: ADTState) => state.ADTSelectReducer.checkState);

  const checkAll = (dataAmount: number) => {
    dispatch(setSelectedRows(Array.from({ length: dataAmount }, (_, i) => i)));
    dispatch(setCheckState(1));
  };

  const uncheckAll = () => {
    dispatch(setSelectedRows([]));
    dispatch(setCheckState(0));
  };

  const pageCheck = () => {
    const currPageA = Math.abs((page - 1) * pageSize - totalItems);

    const currPageAmount = currPageA < pageSize ? currPageA : pageSize;

    /*  const divAmount = currPageAmount % pageSize;
    console.log("pageCheck", divAmount); */
    dispatch(
      setSelectedRows(
        Array.from(
          {
            length: currPageAmount,
          },
          (_, i) => i + (page - 1) * pageSize
        )
      )
    );
    dispatch(setCheckState(2));
  };

  const checkAllButtonClick = () => {
    switch (checkState) {
      case 0:
        checkAll(totalItems);
        break;
      case 1:
        pageCheck();
        break;
      case 2:
        uncheckAll();
        break;
      default:
        break;
    }
  };

  const checkCellClick = (rr: number) => {
    const row = rr + (page - 1) * pageSize;
    // console.log("row", row);
    const newSelectedRows = selectedRows.includes(row) ? selectedRows.filter((r) => r !== row) : [...selectedRows, row];
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
