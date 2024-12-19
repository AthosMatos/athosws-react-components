import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageSizesType, PagingState } from "./interfaces";

const initialState: PagingState = {
  filteredData: [],
  searchFilter: "",
  page: 1,
  pageSize: 5,
  goingForward: false,
  canGoBack: false,
  canGoForward: false,
  totalPages: 0,
  totalItensAmount: 0,
};

const Slice = createSlice({
  name: "ADTFilteredProps",
  initialState,
  reducers: {
    setFilteredData: (state, action: PayloadAction<any[]>) => {
      state.filteredData = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setCanGoBack: (state, action: PayloadAction<boolean>) => {
      state.canGoBack = action.payload;
    },
    setCanGoForward: (state, action: PayloadAction<boolean>) => {
      state.canGoForward = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setPageSize: (state, action: PayloadAction<PageSizesType>) => {
      state.pageSize = action.payload;
    },
    setTotalItensAmount: (state, action: PayloadAction<number>) => {
      state.totalItensAmount = action.payload;
    },
    setGoingForward: (state, action: PayloadAction<boolean>) => {
      state.goingForward = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFilteredData,
  setSearchFilter,
  setPage,
  setPageSize,
  setCanGoBack,
  setCanGoForward,
  setTotalPages,
  setTotalItensAmount,
  setGoingForward,
} = Slice.actions;

const ADTPagingReducer = Slice.reducer;

export default ADTPagingReducer;
