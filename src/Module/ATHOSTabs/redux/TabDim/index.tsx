import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabDimI {
  left?: number;
  width?: number;
  height?: number;
  top?: number;
}
interface ActiveTabDimI extends TabDimI {
  init: boolean;
}

const initialState: ActiveTabDimI = {
  init: false,
};

const Slice = createSlice({
  name: "ActiveTabDim",
  initialState,
  reducers: {
    setActiveTabDim: (state, action: PayloadAction<TabDimI>) => {
      return { ...state, ...action.payload };
    },
    setInit: (state) => {
      state.init = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveTabDim, setInit } = Slice.actions;

const ActiveTabDimReducer = Slice.reducer;

export default ActiveTabDimReducer;
