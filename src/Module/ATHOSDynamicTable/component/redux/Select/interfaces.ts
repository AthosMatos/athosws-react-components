export type checkStates = 0 | 1 | { pages: number[] };

export const CheckState = {
  NONE: 0 as checkStates,
  ALL: 1 as checkStates,
  PAGE: { pages: [] } as checkStates,
};

export interface SelectState {
  selectedRows: string[];
  checkState: 0 | 1 | { pages: number[] };
  selectedPages: number[];
  selectedRowsToastOpen: boolean;
}
