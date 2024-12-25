import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageSizesType, PagingState } from "./interfaces";

const initialState: PagingState = {
  filteredData: [],
  searchFilter: "",
  page: 1,
  pageSize: 5,
  goingForward: false,
};

const Slice = createSlice({
  name: "ADTFilteredProps",
  initialState,
  reducers: {
    filterBySearch: (
      state,
      action: PayloadAction<{
        searchFilter: string;
        data: any[];
      }>
    ) => {
      const { searchFilter, data } = action.payload;
      state.searchFilter = searchFilter;
      state.page = 1;
      const start = 0;
      const end = state.pageSize;
      const filtered = data
        ?.filter((row) => {
          return Object.values(row).some((value: any) => {
            return value
              .toString()
              .toLowerCase()
              .includes(searchFilter.toLowerCase());
          });
        })
        .slice(start, end);
      state.filteredData = filtered;
    },
    movePage: (
      state,
      action: PayloadAction<{
        to: "next" | "prev" | number;
        totalPages: number;
        page: number;
        canGoForward: boolean;
        canGoBack: boolean;
        data: any[];
      }>
    ) => {
      const { to, totalPages, page, canGoBack, canGoForward, data } =
        action.payload;
      if (typeof to === "number" && to > 0 && to <= totalPages && to !== page) {
        state.page = to;

        const start = (to - 1) * state.pageSize;
        const end = start + state.pageSize;
        state.filteredData = data.slice(start, end);
        if (to < page) {
          state.goingForward = false;
        }
        if (to > page) {
          state.goingForward = true;
        }
        return;
      }
      if ((to === "next" && !canGoForward) || (to === "prev" && !canGoBack)) {
        return;
      }
      if (to === "next") {
        const start = state.page * state.pageSize;
        const end = start + state.pageSize;
        state.filteredData = data.slice(start, end);
        state.page += 1;

        state.goingForward = true;
      } else if (to === "prev") {
        const start = (state.page - 2) * state.pageSize;
        const end = start + state.pageSize;
        state.filteredData = data.slice(start, end);
        state.page -= 1;

        state.goingForward = false;
      }
    },
    changePageSize: (state, action: PayloadAction<PageSizesType>) => {
      state.pageSize = action.payload;
    },

    setFilteredData: (state, action: PayloadAction<any[]>) => {
      const start = (state.page - 1) * state.pageSize;
      const end = start + state.pageSize;
      state.filteredData = action.payload.slice(start, end);
    },
  },
});

// Action creators are generated for each case reducer function
export const { filterBySearch, setFilteredData, movePage, changePageSize } =
  Slice.actions;

const ADTPagingReducer = Slice.reducer;

export default ADTPagingReducer;
