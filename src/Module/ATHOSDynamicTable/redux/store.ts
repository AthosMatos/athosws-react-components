import { configureStore } from "@reduxjs/toolkit";
import ADTCustomStatesReducer from "./CustomStates/provider";
import ADTFilteringReducer from "./Filtering/provider";
import ADTPropsReducer from "./props/provider";
import ADTSelectReducer from "./Select/provider";

export const ADTStore = configureStore({
  reducer: {
    ADTPropsReducer,
    ADTCustomStatesReducer,
    ADTSelectReducer,
    ADTFilteringReducer,
  },
});

export type ADTState = ReturnType<typeof ADTStore.getState>;
export type ADTDispatch = typeof ADTStore.dispatch;
