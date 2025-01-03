export type PageSizesType = 2 | 5 | 10 | 20 | 50 | 100;

export interface PagingState {
  filteredData: any[];
  searchFilter: string;
  page: number;
  pageSize: PageSizesType;
  movingPage: boolean;
  beingMoved: string[];
  goingForward: boolean;
  firstOpen: boolean;
}
