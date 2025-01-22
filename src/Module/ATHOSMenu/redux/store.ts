import { configureStore } from "@reduxjs/toolkit";
import AMPropsReducer from "./Props";

export const AMStore = configureStore({
  reducer: {
    AMPropsReducer,
  },
});
export type AMState = ReturnType<typeof AMStore.getState>;
export type AMDispatch = typeof AMStore.dispatch;
