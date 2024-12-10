import { configureStore } from "@reduxjs/toolkit";
import ADTFilteredPropsReducer from "./FilteredData/provider";
import ADTPropsReducer from "./props/provider";
import ADTSelectPropsReducer from "./SelectProps/provider";
import ADTablePropsReducer from "./TableProps/provider";

export const ADTStore = configureStore({
  reducer: {
    ADTPropsReducer,
    ADTablePropsReducer,
    ADTSelectPropsReducer,
    ADTFilteredPropsReducer,
  },
});

export type ADTState = ReturnType<typeof ADTStore.getState>;
export type ADTDispatch = typeof ADTStore.dispatch;
