import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultOptProps } from "../../interfaces";

interface SelectedReduxProps {
  optionSelected: string | null;
  subOptionSelected: string | null;
  subSubOptionSelected: string | null;
  selectedData: DefaultOptProps | null;
}

const initialState: SelectedReduxProps = {
  optionSelected: null,
  subOptionSelected: null,
  subSubOptionSelected: null,
  selectedData: null,
};

const Slice = createSlice({
  name: "AMSelected",
  initialState,
  reducers: {
    selectOption: (state, action: PayloadAction<string>) => {
      if (state.optionSelected === action.payload) state.optionSelected = null;
      else state.optionSelected = action.payload;
      state.subOptionSelected = null;
      state.subSubOptionSelected = null;
    },
    selectSubOption: (state, action: PayloadAction<string>) => {
      if (state.subOptionSelected === action.payload) state.subOptionSelected = null;
      else state.subOptionSelected = action.payload;
      state.subSubOptionSelected = null;
    },
    selectSubSubOption: (state, action: PayloadAction<string>) => {
      if (state.subSubOptionSelected === action.payload) {
        state.subSubOptionSelected = null;
        return;
      }
      state.subSubOptionSelected = action.payload;
    },
    selectData: (state, action: PayloadAction<DefaultOptProps>) => {
      state.selectedData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectOption, selectSubOption, selectSubSubOption, selectData } = Slice.actions;

const AMSelectedReducer = Slice.reducer;

export default AMSelectedReducer;
