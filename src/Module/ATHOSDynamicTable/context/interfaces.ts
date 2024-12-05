import { Dispatch, SetStateAction } from "react";
import { DynamicTableProps } from "../interfaces";
import { PageSizesType } from "../hooks/useADTFilterData";

export interface ADTContextProps<T> {
  props: DynamicTableProps<T> & {
    columns: any[];
    originalData: T[];
  };

  selectMethods: {
    checkCellClick: (row: number) => void;
    checkAllButtonClick: () => void;
  };
  selectData: {
    selectedRows: number[];
    checkState: 0 | 1 | 2;
  };
  columnsIDs: ColumnsIds<T> | undefined;
  setColumnsIDs: Dispatch<SetStateAction<ColumnsIds<T> | undefined>>;
  uncheckAll: () => void;
  colsTRId: string;
  selectedRowsToastOpen: boolean;
  setSelectedRowsToastOpen: Dispatch<SetStateAction<boolean>>;
  colH?: number;
  tableRef: React.RefObject<any>;
  rowHeight: number;
  pageState: {
    page: number;
    pageSize: number;
    changePageSize: (size: PageSizesType) => void;
    movePage: (to: "next" | "prev" | number) => void;
    moving: boolean;
    canGoBack: boolean;
    canGoForward: boolean;
    totalPages: number;
    filterBySearch: (search: string) => void;
  };
}

export type ColumnsIds<T> = {
  [key in keyof T]: string;
};
