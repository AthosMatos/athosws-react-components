export interface ADTSelectedRowsToastProps {
  selectedRows: number;
  toastID: string;
  uncheckAll: () => void;
  selectData: {
    selectedRows: number[];
    checkState: 0 | 1 | 2;
  };
  tableID: string;
  funcs?: {
    main: React.ReactNode;
    secondary: React.ReactNode;
    others: (() => void)[];
  };
  highlightColor: string;
}
