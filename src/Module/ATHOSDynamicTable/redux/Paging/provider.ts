import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageSizesType, PagingState } from "./interfaces";

const initialState: PagingState = {
  filteredData: [],
  searchFilter: "",
  page: 1,
  pageSize: 5,
  movingPage: false,
  beingMoved: [],
  goingForward: false,
  firstOpen: true,
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
            return value.toString().toLowerCase().includes(searchFilter.toLowerCase());
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
      // if (state.movingPage) return;

      const { to, totalPages, page, canGoBack, canGoForward, data } = action.payload;
      if (typeof to === "number" && to > 0 && to <= totalPages && to !== page) {
        state.page = to;
        state.movingPage = true;
        const start = (to - 1) * state.pageSize;
        const end = start + state.pageSize;
        const filter = data.slice(start, end);
        state.beingMoved = filter.map((row) => row.id);
        state.filteredData = filter;
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
      let start = 0;
      if (to === "next") {
        start = state.page * state.pageSize;
        state.goingForward = true;
        state.page += 1;
      } else {
        start = (state.page - 2) * state.pageSize;
        state.goingForward = false;
        state.page -= 1;
      }
      const end = start + state.pageSize;
      const filter = data.slice(start, end);
      state.beingMoved = filter.map((row) => row.id);
      state.filteredData = filter;
      state.movingPage = true;
    },
    changePageSize: (state, action: PayloadAction<PageSizesType>) => {
      state.pageSize = action.payload;
    },

    setFilteredData: (state, action: PayloadAction<any[]>) => {
      const start = (state.page - 1) * state.pageSize;
      const end = start + state.pageSize;
      state.filteredData = action.payload.slice(start, end);
    },
    setMovingPage: (state, action: PayloadAction<boolean>) => {
      state.movingPage = action.payload;
    },
    setFirstOpen: (state, action: PayloadAction<boolean>) => {
      state.firstOpen = action.payload;
    },
    setBeingMoved: (state, action: PayloadAction<string[]>) => {
      state.beingMoved = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { filterBySearch, setFilteredData, movePage, setBeingMoved, changePageSize, setFirstOpen, setMovingPage } = Slice.actions;

const ADTPagingReducer = Slice.reducer;

export default ADTPagingReducer;
