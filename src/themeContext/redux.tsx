import { createSlice } from "@reduxjs/toolkit";

interface ThemeContextI {
  theme: "dark" | "light";
}

const initialState: ThemeContextI = {
  theme: localStorage.currentTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
};

export const getTheme = () => {
  const currentTheme = localStorage.currentTheme;
  if (!currentTheme) {
    //get system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return currentTheme;
};

export const setupTheme = () => {
  //if there's no theme set, use system preference
  //this only specifies if is dark or not (wich means light)
  document.documentElement.classList.toggle(
    "dark",
    localStorage.currentTheme === "dark" || (!("currentTheme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};

const toogleTheme = () => {
  const currentTheme = getTheme();
  localStorage.currentTheme = currentTheme === "dark" ? "light" : "dark";
  setupTheme();
};

const Slice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    tooogleTheme: (state) => {
      toogleTheme();
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

// Action creators are generated for each case reducer function
export const { tooogleTheme } = Slice.actions;

export const ThemeReducer = Slice.reducer;
