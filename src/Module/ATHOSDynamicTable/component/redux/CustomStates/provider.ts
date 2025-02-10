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
  },
});

// Action creators are generated for each case reducer function
export const { setTotalItems } = Slice.actions;

const ADTCustomStatesReducer = Slice.reducer;

export default ADTCustomStatesReducer;
