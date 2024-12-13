import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicTableProps } from "../../interfaces";
import { ADTPropsState } from "./interfaces";

const initialState: ADTPropsState<any> = {} as any;

const Slice = createSlice({
  name: "ADTProps",
  initialState,
  reducers: {
    fillProps: (state, action: PayloadAction<DynamicTableProps<any>>) => {
      return { ...state, ...action.payload };
    },
    setColumns: (state, action: PayloadAction<any[]>) => {
      state.columns = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fillProps: fillADTProps, setColumns } = Slice.actions;

const ADTPropsReducer = Slice.reducer;

export default ADTPropsReducer;
