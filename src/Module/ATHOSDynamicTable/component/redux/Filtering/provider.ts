import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagingState as FilteringState, PageSizesType } from "./interfaces";

const initialState: FilteringState = {
  filteredData: [],
  filteredColumns: [],
  searchFilter: "",
  page: 1,
  pageSize: 5,
  firstOpen: true,
  columnOrder: [],
  orderSorted: { column: null, state: -1 },
  defaultDataOrder: [],
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
      if (to === page) return;

      if (typeof to === "number" && to > 0 && to <= totalPages) {
        state.page = to;
        const start = (to - 1) * state.pageSize;
        const end = start + state.pageSize;
        const filter = data.slice(start, end);
        state.filteredData = filter;

        return;
      }
      if ((to === "next" && !canGoForward) || (to === "prev" && !canGoBack)) {
        return;
      }
      let start = 0;
      if (to === "next") {
        start = state.page * state.pageSize;
        state.page += 1;
      } else {
        start = (state.page - 2) * state.pageSize;
        state.page -= 1;
      }
      const end = start + state.pageSize;
      const filter = data.slice(start, end);
      state.filteredData = filter;
    },
    changePageSize: (state, action: PayloadAction<PageSizesType>) => {
      state.pageSize = action.payload;
    },
    setFilteredData: (state, action: PayloadAction<any[]>) => {
      const start = (state.page - 1) * state.pageSize;
      const end = start + state.pageSize;
      state.filteredData = action.payload.slice(start, end);
    },
    setFilteredColumns: (state, action: PayloadAction<any[]>) => {
      state.filteredColumns = action.payload;
      state.columnOrder = action.payload;
    },

    setFirstOpen: (state, action: PayloadAction<boolean>) => {
      state.firstOpen = action.payload;
    },

    filterColumns: (state, action: PayloadAction<string>) => {
      if (state.filteredColumns.includes(action.payload)) {
        state.filteredColumns = state.filteredColumns.filter((column) => column !== action.payload);
      } else {
        //based on the order of the columns
        const newCols = [...state.filteredColumns, action.payload];
        //reorder the columns
        state.filteredColumns = state.columnOrder.filter((col) => newCols.includes(col));
      }
    },
    sortDataByColumn: (
      state,
      action: PayloadAction<{
        column: string;
        data: any[];
      }>
    ) => {
      const filter = () => {
        const start = (state.page - 1) * state.pageSize;
        const end = start + state.pageSize;
        const sorted = [...data].sort((a, b) => {
          const A = a[column];
          const B = b[column];
          if (A < B) return -1;
          if (A > B) return 1;
          return 0;
        });
        return { sorted, start, end };
      };

      //order states, -1 = not sorted, 0 = ascending, 1 = descending
      const { column: col, data } = action.payload;
      let column = col;
      if (col.includes("-isExtraCol-")) {
        column = col.split("-isExtraCol-")[0];
      }
      if (state.orderSorted.column === col) {
        if (state.orderSorted.state === 0) {
          const { end, sorted, start } = filter();
          state.filteredData = sorted.reverse().slice(start, end);
          state.orderSorted.state = 1;
        } else if (state.orderSorted.state === 1) {
          //reset the order
          state.orderSorted.column = null;
          state.orderSorted.state = -1;
          state.filteredData = state.defaultDataOrder;
          state.defaultDataOrder = [];
        }
        return;
      }
      state.defaultDataOrder = state.filteredData;
      const { end, sorted, start } = filter();
      state.filteredData = sorted.slice(start, end);
      state.orderSorted.column = col;
      state.orderSorted.state = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  filterBySearch,
  setFilteredData,
  movePage,
  filterColumns,
  setFilteredColumns,
  changePageSize,
  setFirstOpen,

  sortDataByColumn,
} = Slice.actions;

const ADTFilteringReducer = Slice.reducer;

export default ADTFilteringReducer;
