import { configureStore } from "@reduxjs/toolkit";
import BodyDirReducer from "./BodyDir";
import ATHOSTabsPropsReducer from "./Props";
import ActiveTabDimReducer from "./TabDim";

const ATStore = configureStore({
  reducer: {
    ActiveTabDimReducer,
    ATHOSTabsPropsReducer,
    BodyDirReducer,
  },
});
export type ATState = ReturnType<typeof ATStore.getState>;
export type ATDispatch = typeof ATStore.dispatch;
