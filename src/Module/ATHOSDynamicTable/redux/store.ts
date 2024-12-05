import { configureStore } from "@reduxjs/toolkit";
import ADTPropsReducer from "./props/provider";
import ADTablePropsReducer from "./TableProps/provider";

export const ADTStore = configureStore({
  reducer: {
    ADTPropsReducer,
    ADTablePropsReducer,
  },
});

export type ADTState = ReturnType<typeof ADTStore.getState>;
export type ADTDispatch = typeof ADTStore.dispatch;
