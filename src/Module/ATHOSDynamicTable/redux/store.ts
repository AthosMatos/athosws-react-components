import { configureStore } from "@reduxjs/toolkit";
import ADTCustomStatesReducer from "./CustomStates/provider";
import ADTPagingReducer from "./Paging/provider";
import ADTPropsReducer from "./props/provider";
import ADTSelectReducer from "./Select/provider";

export const ADTStore = configureStore({
  reducer: {
    ADTPropsReducer,
    ADTCustomStatesReducer: ADTCustomStatesReducer,
    ADTSelectReducer: ADTSelectReducer,
    ADTPagingReducer: ADTPagingReducer,
  },
});

export type ADTState = ReturnType<typeof ADTStore.getState>;
export type ADTDispatch = typeof ADTStore.dispatch;
