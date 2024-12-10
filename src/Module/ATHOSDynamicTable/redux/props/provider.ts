import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicTableProps } from "../../interfaces";

interface ADTPropsState<T> extends DynamicTableProps<T> {
  columns: any[];
  originalData: T[];
}

const initialState: ADTPropsState<any> = {} as any;

const Slice = createSlice({
  name: "ADTProps",
  initialState,
  reducers: {
    fillProps: (
      state,
      action: PayloadAction<
        DynamicTableProps<any> & {
          columns: any[];
          originalData: any[];
        }
      >
    ) => {
      return action.payload;
    },
    /*  setFilteredData: (
      state,
      action: PayloadAction<{
        filteredData: any[];
      }>
    ) => {
      state.data = action.payload.filteredData;
    } */
  },
});

// Action creators are generated for each case reducer function
export const { fillProps: fillADTProps } = Slice.actions;

const ADTPropsReducer = Slice.reducer;

export default ADTPropsReducer;
