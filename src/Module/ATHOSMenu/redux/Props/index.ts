import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ATHOSMenuProps } from "../../interfaces";

export type WithId<T> = T & { id?: string };

const initialState: ATHOSMenuProps = {
  options: [],
};

const Slice = createSlice({
  name: "AMProps",
  initialState,
  reducers: {
    fillProps: (state, action: PayloadAction<ATHOSMenuProps>) => {
      const payload = action.payload;

      return { ...state, ...payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { fillProps } = Slice.actions;

const AMPropsReducer = Slice.reducer;

export default AMPropsReducer;
