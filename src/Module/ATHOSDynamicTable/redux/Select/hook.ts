import { useDispatch, useSelector } from "react-redux";
import { ADTState } from "../store";
import {
  setCheckState,
  setSelectedRows,
  setSelectedRowsToastOpen,
} from "./provider";

export const useADTSelect = () => {
  const dispatch = useDispatch();

  const { pageSize, totalItensAmount } = useSelector(
    (state: ADTState) => state.ADTFilteredPropsReducer
  );
  const { selectedRows, checkState } = useSelector(
    (state: ADTState) => state.ADTSelectPropsReducer
  );

  const checkAll = (dataAmount: number) => {
    dispatch(setSelectedRows(Array.from({ length: dataAmount }, (_, i) => i)));
    dispatch(setCheckState(1));
  };

  const uncheckAll = () => {
    dispatch(setSelectedRows([]));
    dispatch(setCheckState(0));
  };

  const pageCheck = () => {
    dispatch(setSelectedRows(Array.from({ length: pageSize }, (_, i) => i)));
    dispatch(setCheckState(2));
  };

  const checkAllButtonClick = () => {
    switch (checkState) {
      case 0:
        checkAll(totalItensAmount);
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

  const checkCellClick = (row: number) => {
    const newSelectedRows = selectedRows.includes(row)
      ? selectedRows.filter((r) => r !== row)
      : [...selectedRows, row];
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