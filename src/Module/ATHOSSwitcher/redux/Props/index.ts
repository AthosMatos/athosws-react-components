import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ATHOSSwitcherProps } from "../../interfaces";

const initialState: ATHOSSwitcherProps = {
  switchs: [],
};

const Slice = createSlice({
  name: "ATHOSSwitcherProps",
  initialState,
  reducers: {
    setATHOSSwitcherProps: (state, action: PayloadAction<ATHOSSwitcherProps>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setATHOSSwitcherProps } = Slice.actions;

const ATHOSSwitcherPropsReducer = Slice.reducer;

export default ATHOSSwitcherPropsReducer;
