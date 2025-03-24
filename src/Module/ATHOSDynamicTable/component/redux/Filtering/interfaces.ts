export type PageSizesType = 2 | 5 | 10 | 20 | 50 | 100;

export interface PagingState {
  filteredData: any[];
  filteredColumns: any[];
  searchFilter: string;
  page: number;
  pageSize: PageSizesType;
  firstOpen: boolean;
  columnOrder: string[];
  orderSorted: {
    state: number;
    column: string | null;
  };
  defaultDataOrder: any[];
}
