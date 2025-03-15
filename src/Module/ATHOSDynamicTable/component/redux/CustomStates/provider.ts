import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomStatesState } from "./interfaces";

const initialState: CustomStatesState = {
  totalItems: 0,
};

const Slice = createSlice({
  name: "ADTableProps",
  initialState,
  reducers: {
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setColShort: (state, action: PayloadAction<{ column: string; short: boolean }>) => {
      const { column, short } = action.payload;
      if (state.columnsShort && state.columnsShort.hasOwnProperty(column) && state.columnsShort[column] === short) return;
      state.columnsShort = { ...state.columnsShort, [column]: short };
      /*  state.columnsShort[column] = short; */
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTotalItems, setColShort } = Slice.actions;

const ADTCustomStatesReducer = Slice.reducer;

export default ADTCustomStatesReducer;
