import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnsIds } from "../../context/interfaces";

interface State {
  pageSize: number;
  columnsIDs?: ColumnsIds<any>;
  totalItensAmount: number;
  colH?: number;
  colsTRId?: string;
}

const initialState: State = {
  pageSize: 10,
  totalItensAmount: 0,
};

const Slice = createSlice({
  name: "ADTableProps",
  initialState,
  reducers: {
    setColumnsIDs: (state, action: PayloadAction<ColumnsIds<any>>) => {
      state.columnsIDs = action.payload;
    },
    setColH: (state, action: PayloadAction<number>) => {
      state.colH = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setTotalItensAmount: (state, action: PayloadAction<number>) => {
      state.totalItensAmount = action.payload;
    },
    setColsTRId: (state, action: PayloadAction<string>) => {
      state.colsTRId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setColumnsIDs,
  setColH,
  setPageSize,
  setTotalItensAmount,
  setColsTRId,
} = Slice.actions;

const ADTablePropsReducer = Slice.reducer;

export default ADTablePropsReducer;
