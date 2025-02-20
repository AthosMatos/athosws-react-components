import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

interface PageContextType {
  title: string;
  subtitle: string;
}

const initialState: PageContextType = {
  title: "",
  subtitle: "",
};

const Slice = createSlice({
  name: "Page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPage } = Slice.actions;

export const PageReducer = Slice.reducer;

export const usePage = () => {
  const dispatch = useDispatch();
  const setTitle = (title: string, subtitle: string) => {
    dispatch(setPage({ title, subtitle }));
  };

  return {
    setTitle,
  };
};
