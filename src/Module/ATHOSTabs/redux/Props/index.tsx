import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ATHOSTabsProps } from "../../interfaces";

const initialState: ATHOSTabsProps = {
  tabs: [],
};

const Slice = createSlice({
  name: "ATHOSTabsProps",
  initialState,
  reducers: {
    setProps: (state, action: PayloadAction<ATHOSTabsProps>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProps } = Slice.actions;

const ATHOSTabsPropsReducer = Slice.reducer;

export default ATHOSTabsPropsReducer;
