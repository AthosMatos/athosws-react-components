import { createSlice } from "@reduxjs/toolkit";
import { CheckState, SelectState } from "./interfaces";

const initialState: SelectState = {
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
export const { setCheckState, setSelectedRows, setSelectedRowsToastOpen } =
  Slice.actions;

const ADTSelectReducer = Slice.reducer;

export default ADTSelectReducer;
