import { createSlice } from "@reduxjs/toolkit";

interface State {}

const initialState: State = {};

const Slice = createSlice({
  name: "ADTableProps",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
const {} = Slice.actions;

const ADTablePropsReducer = Slice.reducer;

export default ADTablePropsReducer;
