import { createSlice } from "@reduxjs/toolkit";

export interface BodyDirI {
  direction: "left" | "right";
}

const initialState: BodyDirI = {
  direction: "right",
};

const Slice = createSlice({
  name: "BodyDir",
  initialState,
  reducers: {
    swipeLeft: (state) => {
      state.direction = "left";
    },
    swipeRight: (state) => {
      state.direction = "right";
    },
  },
});

// Action creators are generated for each case reducer function
export const { swipeLeft, swipeRight } = Slice.actions;

const BodyDirReducer = Slice.reducer;

export default BodyDirReducer;
