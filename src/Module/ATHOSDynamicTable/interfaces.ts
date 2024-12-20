export type GlobalConfig = {
  maxCharToCut?: number;
  label?: string;
  maxWidth?: number;
  minWidth?: number;
  minColWidthToShort?: number;
  shortOnlyifCut?: boolean;
  colComponent?: React.ReactNode;
  cellComponent?: (cell: any) => React.ReactNode;
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

export type ExtraColumnsI<T> = {
  showCondition?: (data: T) => boolean;
  component: (data: T) => React.ReactNode;
};
export type ColConfig<T> = {
  [key in keyof T]?: GlobalConfig;
};
export type StartShortI<T> = {
  [key in keyof T]?: boolean;
};

export type ColumnTextTableStyle<T> = {
  [key in keyof T]?: string;
};

export type CellColumnTextTableStyle<T> = {
  [key in keyof T]?: {
    global?: string;
    specificIndex?: {
      indexes: number[];
      color: string;
    };
    condional?: {
      showCondition: (rowColumnData: string) => boolean;
      color: string;
    };
  };
};
export type TableStyle<T> = {
  highlightColor?: string;
  cellTextColor?: {
    global?: string;
    specific?: CellColumnTextTableStyle<T>;
  };
  columnTextColor?: {
    global?: string;
    specific?: ColumnTextTableStyle<T>;
  };
};

type ResizableConfig = {
  autoBorder?: boolean;
};

export type DynamicTableProps<T> = {
  className?: string;
  tableClassName?: string;
  tableName: string;
  data: T[];
  resizeable?: boolean | ResizableConfig;
  tableStyle?: TableStyle<T>;
  colConfig?: ColConfig<T>;
  globalConfig?: GlobalConfig;
  columnsToHide?: (keyof T)[];
  columnsToShow?: (keyof T)[];
  style?: React.CSSProperties;
  paddingBetweenCells?: number;
  paddingHeader?: number;
  paddingBetweenColumns?: number;
  paddingBetweenExtraColumns?: number;
  selectedRowsTooltip?: SelectedRowsTooltipI<T>;
  extraColumns?: ExtraColumnsI<T>[];
  startShort?: StartShortI<T> | boolean;
  persistPrimaryColumn?:
    | {
        backgroundColor?: string;
      }
    | boolean;
  movePageTransitionDuration?: number;
  autoLockHeight?: boolean;
};

export interface ColumnsProps<T> {
  columns: (keyof T)[];
}

export type ColumnsIds<T> = {
  [key in keyof T]: string;
};
