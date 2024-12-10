import { createSlice } from "@reduxjs/toolkit";

export type PageSizesType = 5 | 10 | 20 | 50 | 100;

interface State {
  filteredData: any[];
  searchFilter: string;
  page: number;
  pageSize: PageSizesType;
  filterBySearch: (search: string) => void;
  movePage: (to: "next" | "prev" | number) => void;
  changePageSize: (size: PageSizesType) => void;
  moving: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  totalPages: number;
}

const initialState: State = {
  filteredData: [],
  searchFilter: "",
  page: 1,
  pageSize: 5,
  filterBySearch: () => {},
  movePage: () => {},
  changePageSize: () => {},
  moving: false,
  canGoBack: false,
  canGoForward: false,
  totalPages: 0,
};

const Slice = createSlice({
  name: "ADTFilteredProps",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
const {} = Slice.actions;

const ADTFilteredPropsReducer = Slice.reducer;

export default ADTFilteredPropsReducer;

export const useADTFilteredProps = () => {
  return {};
};
