import { configureStore } from "@reduxjs/toolkit";
import ATHOSSwitcherPropsReducer from "./Props";
import ASSelectedPropsReducer from "./Selected";

const ASStore = configureStore({
  reducer: {
    ATHOSSwitcherPropsReducer,
    ASSelectedPropsReducer,
  },
});
export type ASState = ReturnType<typeof ASStore.getState>;
export type ASDispatch = typeof ASStore.dispatch;
