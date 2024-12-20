import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnsIds } from "../../interfaces";
import { CustomStatesState } from "./interfaces";

const initialState: CustomStatesState = {
  totalItems: 0,
};

const Slice = createSlice({
  name: "ADTableProps",
  initialState,
  reducers: {
    setColumnsIDs: (state, action: PayloadAction<ColumnsIds<any>>) => {
      state.columnsIDs = action.payload;
    },
    setColH: (state, action: PayloadAction<number>) => {
      state.colH = action.payload;
    },
    setColsTRId: (state, action: PayloadAction<string>) => {
      state.colsTRId = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setColumnsIDs, setColH, setColsTRId, setTotalItems } =
  Slice.actions;

const ADTCustomStatesReducer = Slice.reducer;

export default ADTCustomStatesReducer;
