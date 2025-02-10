export type checkStates = 0 | 1 | 2; // 0: none, 1: all, 2: page

export const CheckState = {
  NONE: 0 as checkStates,
  ALL: 1 as checkStates,
  PAGE: 2 as checkStates,
};

export interface SelectState {
  selectedRows: number[];
  checkState: 0 | 1 | 2;
  selectedRowsToastOpen: boolean;
}
