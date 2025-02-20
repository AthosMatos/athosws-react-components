import { configureStore } from "@reduxjs/toolkit";
import AMPropsReducer from "./Props";
import AMSelectedReducer from "./Selected";

const AMStore = configureStore({
  reducer: {
    AMPropsReducer,
    AMSelectedReducer,
  },
});
export type AMState = ReturnType<typeof AMStore.getState>;
export type AMDispatch = typeof AMStore.dispatch;
