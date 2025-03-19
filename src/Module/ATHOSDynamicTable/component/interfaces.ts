type TdefaultStyles = {
  style?: React.CSSProperties;
  className?: string;
};

export type GlobalConfig = {
  maxCharToCut?: number;
  maxWidth?: number; //implement
  minWidth?: number; //implement
  minColWidthToShort?: number; //imrpove add stages like short, medium, long
  cellComponent?: (cell: any) => React.ReactNode;
};
export type SpecificColConfig = {
  maxCharToCut?: number;
  label?: React.ReactNode;
  maxWidth?: number; //implement
  minWidth?: number; //implement
  minColWidthToShort?: number; //imrpove add stages like short, medium, long
  cellComponent?: (cell: any) => React.ReactNode;
} & TdefaultStyles;

export type ExtraColConfig<T> = {
  id?: string;
  column: keyof T;
  maxCharToCut?: number;
  label?: React.ReactNode;
  maxWidth?: number; //implement
  minWidth?: number; //implement
  minColWidthToShort?: number; //imrpove add stages like short, medium, long
  cellComponent?: (cell: any) => React.ReactNode;
} & TdefaultStyles;

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
  containerColor?: TdefaultStyles;
};

export type ExtraCellColumnsI<T> = {
  showCondition?: (data: T) => boolean;
  component: (data: T) => React.ReactNode;
};
export type ColConfig<T> = {
  [key in keyof T]?: SpecificColConfig;
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
  selected?: {
    rowColor?: string;
    rowTextColor?: string;
    rowBorderColor?: string;
    selectedIconColor?: string;
  };
  highlightColor?: string;
  textColor?: string;
  accentColor?: string;
  accentColor2?: string;
  cellTextColor?: {
    global?: string;
    specific?: CellColumnTextTableStyle<T>;
  };
  columnTextColor?: {
    global?: string;
    specific?: ColumnTextTableStyle<T>;
  };
};

type HeaderStyle = {
  title: TdefaultStyles;
  subtitle?: TdefaultStyles;
  config?: TdefaultStyles & {
    dropdown?: TdefaultStyles;
  };
  search?: {
    icon: TdefaultStyles;
    input: TdefaultStyles & {
      placeholder?: string;
    };
  };
};

type ResizableConfig = {
  autoBorder?: boolean;
};

export type DynamicTableProps<T> = {
  headerStyle?: HeaderStyle;

  loading?: boolean | string;
  boldColumns?: boolean;
  wrapperClassName?: string;
  tableWrapperClassName?: string;
  className?: string;
  tableName: string;
  data: T[];
  resizeable?: boolean | ResizableConfig;
  tableStyle?: TableStyle<T>;
  colConfig?: ColConfig<T>;
  globalConfig?: GlobalConfig;
  columnsToHide?: (keyof T)[];
  columnsToShow?: (keyof T)[];
  customColumns?: {
    newLabel: string;
    colsToGet: (keyof T)[];
    index?: number;
    render?: (data: T) => React.ReactNode;
  }[];

  columnOrder?: (keyof T)[];
  noDataPlaceholder?: React.ReactNode;
  style?: React.CSSProperties;
  spacingBetweenCells?: number;
  spacingHeader?: number;
  spacingBetweenColumns?: number;
  spacingBetweenExtraColumns?: number;
  selectedRowsTooltip?: SelectedRowsTooltipI<T>;
  extraCellColumns?: ExtraCellColumnsI<T>[];
  extraColumns?: ExtraColConfig<T>[];
  startShort?: StartShortI<T> | boolean;
  persistPrimaryColumn?:
    | {
        backgroundColor?: string;
        borderColor?: string;
      }
    | boolean;
  /*  autoLockHeight?: boolean; */
};

export interface ColumnsProps<T> {
  columns: (keyof T)[];
}

export type ColumnsIds<T> = {
  [key in keyof T]: string;
};
