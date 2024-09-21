import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { v4 } from "uuid";
import useADTSelectedData from "../hooks/useADTSelectedData";
import { DynamicTableProps } from "../interfaces";

interface ADTContextProps<T> {
  props: DynamicTableProps<T> & {
    columns: any[];
  };

  selectMethods: {
    checkCellClick: (row: number) => void;
    checkAllButtonClick: (dataAmount: number) => void;
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
}

export type ColumnsIds<T> = {
  [key in keyof T]: string;
};

const ADTContext = createContext<ADTContextProps<any> | undefined>(undefined);

export function ADTProvider<T>({
  children,
  props,
}: {
  children: React.ReactNode;
  props: DynamicTableProps<T>;
}) {
  const { data, columnsToHide, columnsToShow, tableStyle } = props;
  const columns = useMemo(() => {
    if (columnsToHide) {
      return Object.keys(data[0] as object).filter(
        (column) => !columnsToHide.includes(column as keyof T)
      ) as (keyof T)[];
    } else if (columnsToShow) {
      return columnsToShow;
    } else return Object.keys(data[0] as object) as (keyof T)[];
  }, [columnsToHide, columnsToShow, data]);

  const {
    selectMethods,
    selectData,
    uncheckAll,
    selectedRowsToastOpen,
    setSelectedRowsToastOpen,
  } = useADTSelectedData({
    pageSize: 5,
  });

  const [columnsIDs, setColumnsIDs] = useState<ColumnsIds<T>>();
  const [colsTRId, setColsTRId] = useState<string>(v4());

  useEffect(() => {
    const columnsIDs = columns.reduce((acc, column) => {
      acc[column] = `${column as string}-${v4().toString()}`;
      return acc;
    }, {} as ColumnsIds<T>);
    setColumnsIDs(columnsIDs);
  }, [columns]);

  const [colH, setColH] = useState<number>();

  useEffect(() => {
    const DTColumnWrapperDiv = document.getElementById(colsTRId);
    if (!DTColumnWrapperDiv || !props.paddingHeader) return;
    const h =
      DTColumnWrapperDiv.getBoundingClientRect().height + props.paddingHeader;
    setColH(h);
  }, []);

  return (
    <ADTContext.Provider
      value={{
        selectMethods,
        selectData,
        columnsIDs,
        setColumnsIDs,
        uncheckAll,
        colsTRId,
        selectedRowsToastOpen,
        setSelectedRowsToastOpen,
        colH,
        props: {
          ...props,
          columns,
          tableStyle: {
            ...tableStyle,
            highlightColor: tableStyle?.highlightColor ?? "#ff6262",
          },
        },
      }}
    >
      {children}
    </ADTContext.Provider>
  );
}

export function useADTContext<T>() {
  const context = useContext(ADTContext);
  if (context === undefined) {
    throw new Error("useADTContext must be used within a ADTProvider");
  }
  return context;
}
