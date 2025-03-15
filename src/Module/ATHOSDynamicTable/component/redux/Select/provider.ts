import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckState, checkStates, SelectState } from "./interfaces";

const initialState: SelectState = {
  selectedRows: [],
  checkState: CheckState.NONE,
  selectedRowsToastOpen: false,
  selectedPages: [],
};

const Slice = createSlice({
  name: "ADTSelectprops",
  initialState,
  reducers: {
    setSelectedRows: (state, action) => {
      //make sure that the selected rows are unique
      const uniqueRows = Array.from(new Set(action.payload)) as any[];
      state.selectedRows = uniqueRows;
    },
    setCheckState: (state, action: PayloadAction<checkStates>) => {
      state.checkState = action.payload;
    },
    setSelectedRowsToastOpen: (state, action) => {
      state.selectedRowsToastOpen = action.payload;
    },
    setSelectedPages: (state, action) => {
      state.selectedPages = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCheckState, setSelectedRows, setSelectedRowsToastOpen, setSelectedPages } = Slice.actions;

const ADTSelectReducer = Slice.reducer;

export default ADTSelectReducer;
