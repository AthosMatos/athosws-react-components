export type GlobalConfig = {
  maxCharToCut?: number;
  label?: string;
  maxWidth?: number;
  minWidth?: number;
  minColWidthToShort?: number;
  shortOnlyifCut?: boolean;
  component?: React.ReactNode;
};

export type ColConfig<T> = {
  [key in keyof T]?: GlobalConfig;
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
};

export interface ColumnsProps<T> {
  columns: (keyof T)[];
}
