export type PageSizesType = 2 | 5 | 10 | 20 | 50 | 100;

export interface PagingState {
  filteredData: any[];
  filteredColumns: any[];
  searchFilter: string;
  page: number;
  pageSize: PageSizesType;
  movingPage: boolean;
  beingMoved: string[];
  goingForward: boolean;
  firstOpen: boolean;
  columnOrder: string[];
  showColOrderFilter: boolean;
  orderSorted: {
    state: number;
    column: string | null;
  };
  defaultDataOrder: any[];
}
