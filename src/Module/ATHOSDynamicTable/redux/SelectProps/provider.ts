import { createSlice } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADTState } from "../store";

type checkStates = 0 | 1 | 2; // 0: none, 1: all, 2: page

export const CheckState = {
  NONE: 0 as checkStates,
  ALL: 1 as checkStates,
  PAGE: 2 as checkStates,
};

interface State {
  selectedRows: number[];
  checkState: 0 | 1 | 2;
  selectedRowsToastOpen: boolean;
}

const initialState: State = {
  selectedRows: [],
  checkState: CheckState.NONE,
  selectedRowsToastOpen: false,
};

const Slice = createSlice({
  name: "ADTSelectprops",
  initialState,
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    setCheckState: (state, action) => {
      state.checkState = action.payload;
    },
    setSelectedRowsToastOpen: (state, action) => {
      state.selectedRowsToastOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
const { setCheckState, setSelectedRows, setSelectedRowsToastOpen } =
  Slice.actions;

const ADTSelectPropsReducer = Slice.reducer;

export default ADTSelectPropsReducer;

export const useADTSelectprops = () => {
  const dispatch = useDispatch();
  const { pageSize, totalItensAmount } = useSelector(
    (state: ADTState) => state.ADTablePropsReducer
  );
  const checkState = useSelector(
    (state: ADTState) => state.ADTSelectPropsReducer.checkState
  );
  const selectedRows = useSelector(
    (state: ADTState) => state.ADTSelectPropsReducer.selectedRows
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

  const checkAllButtonClick = useCallback(() => {
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
  }, [checkState]);

  const checkCellClick = useCallback(
    (row: number) => {
      const newSelectedRows = selectedRows.includes(row)
        ? selectedRows.filter((r) => r !== row)
        : [...selectedRows, row];
      dispatch(setSelectedRows(newSelectedRows));
    },
    [setSelectedRows]
  );

  const openSelectedRowsToast = useCallback(() => {
    dispatch(setSelectedRowsToastOpen(true));
  }, [setSelectedRowsToastOpen]);
  const closeSelectedRowsToast = useCallback(() => {
    dispatch(setSelectedRowsToastOpen(false));
  }, [setSelectedRowsToastOpen]);

  return {
    uncheckAll,
    checkCellClick,
    checkAllButtonClick,
    openSelectedRowsToast,
    closeSelectedRowsToast,
  };
};
