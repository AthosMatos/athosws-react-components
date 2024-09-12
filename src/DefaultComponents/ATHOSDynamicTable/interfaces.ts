export type GlobalConfig = {
  maxCharToCut?: number;
  label?: string;
  maxWidth?: number;
  minWidth?: number;
  minColWidthToShort?: number;
  shortOnlyifCut?: boolean;
  colComponent?: React.ReactNode;
  cellComponent?: (cell: string) => React.ReactNode;
};

export type ColConfig<T> = {
  [key in keyof T]?: GlobalConfig;
};

export type ADTLabelI<T> = {
  label: string;
  onClick: (selectedData: T[]) => void;
};

export type SelectedRowsTooltipI<T> = {
  mainFunc?: {
    label?: string;
    icon?: React.ReactNode;
    onClick: (selectedData: T[]) => void;
  };
  secondaryFunc?: {
    label?: string;
    icon?: React.ReactNode;
    onClick: (selectedData: T[]) => void;
  };
  othersFunc?: ADTLabelI<T>[];
};

export type DynamicTableProps<T> = {
  tableID: string;
  data: T[];
  resizeable?: boolean;
  highlightColor?: string;
  colConfig?: ColConfig<T>;
  globalConfig?: GlobalConfig;
  columnsToHide?: (keyof T)[];
  columnsToShow?: (keyof T)[];
  style?: React.CSSProperties;
  paddingBetweenCells?: number;
  paddingHeader?: number;
  paddingBetweenColumns?: number;
  selectedRowsTooltip?: SelectedRowsTooltipI<T>;
};

export interface ColumnsProps<T> {
  columns: (keyof T)[];
}
