import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ASSelectedProps {
  selected: number;
}
const initialState: ASSelectedProps = {
  selected: 0,
};

const Slice = createSlice({
  name: "ASSelectedProps",
  initialState,
  reducers: {
    select: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { select } = Slice.actions;
const ASSelectedPropsReducer = Slice.reducer;

export default ASSelectedPropsReducer;
