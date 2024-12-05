import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicTableProps } from "../../interfaces";

interface State<T> {
  props:
    | (DynamicTableProps<T> & {
        columns: any[];
        originalData: T[];
      })
    | null;
}

const initialState: State<any> = {
  props: null,
};

const Slice = createSlice({
  name: "ADTProps",
  initialState,
  reducers: {
    fillProps: (state, action: PayloadAction<DynamicTableProps<any>>) => {},
  },
});

// Action creators are generated for each case reducer function
const {} = Slice.actions;

const ADTPropsReducer = Slice.reducer;

export default ADTPropsReducer;
