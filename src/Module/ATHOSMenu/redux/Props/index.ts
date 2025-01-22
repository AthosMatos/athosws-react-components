import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ATHOSMenuProps } from "../../interfaces";

const initialState: ATHOSMenuProps = {};

const Slice = createSlice({
  name: "ADTProps",
  initialState,
  reducers: {
    fillProps: (state, action: PayloadAction<ATHOSMenuProps>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { fillProps } = Slice.actions;

const AMPropsReducer = Slice.reducer;

export default AMPropsReducer;
