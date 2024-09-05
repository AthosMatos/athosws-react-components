export type ColConfig<T> = {
  [key in keyof T]?: {
    maxCharToCut?: number;
    label?: string;
    maxWidth?: number;
  };
};

export type DynamicTableProps<T> = {
  data: T[];
  resizeable?: boolean;
  highlightColor?: string;
  colConfig?: ColConfig<T>;
  columnsToHide?: (keyof T)[];
  columnsToShow?: (keyof T)[];
  style?: React.CSSProperties;
  paddingBetweenRows?: number;
  paddingColumn?: number;
  minColWidthToShort?: number;
};

export interface ColumnsProps<T> {
  columns: (keyof T)[];
}
