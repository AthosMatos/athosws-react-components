export type PageSizesType = 2 | 5 | 10 | 20 | 50 | 100;

export interface PagingState {
  filteredData: any[];
  searchFilter: string;
  page: number;
  pageSize: PageSizesType;
  moving: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  totalPages: number;
  goingForward: boolean;
  totalItensAmount: number;
}
