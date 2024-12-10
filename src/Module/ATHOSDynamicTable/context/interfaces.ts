import { Dispatch, SetStateAction } from "react";
import { PageSizesType } from "../hooks/useADTFilterData";
import { DynamicTableProps } from "../interfaces";

export interface ADTContextProps<T> {
  props: DynamicTableProps<T> & {
    columns: any[];
    originalData: T[];
  };

  columnsIDs: ColumnsIds<T> | undefined;
  setColumnsIDs: Dispatch<SetStateAction<ColumnsIds<T> | undefined>>;

  colsTRId: string;

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
