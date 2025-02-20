import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "..";
export type LangsI = "pt-BR" | "en-US";
interface LangContextType {
  lang: LangsI;
}

const initialState: LangContextType = {
  lang: "en-US",
};

const Slice = createSlice({
  name: "Lang",
  initialState,
  reducers: {
    toggleLang: (state) => {
      state.lang = state.lang === "pt-BR" ? "en-US" : "pt-BR";
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleLang, setLang } = Slice.actions;

export const LangReducer = Slice.reducer;

export const useLang = () => {
  const lang = useSelector((state: AppState) => state.LangReducer.lang);
  const dispatch = useDispatch();

  return {
    toggleLang: () => dispatch(toggleLang()),
    setLang: (lang: LangsI) => dispatch(setLang(lang)),
    lang,
  };
};
