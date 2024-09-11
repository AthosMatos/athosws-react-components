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
    columns: (keyof T)[];
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
}

type ColumnsIds<T> = {
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
  const {
    data,
    columnsToHide,
    colConfig,
    columnsToShow,
    resizeable,
    highlightColor,
    paddingBetweenCells: paddingBetweenCells,
  } = props;
  const columns = useMemo(() => {
    if (columnsToHide) {
      return Object.keys(data[0] as object).filter(
        (column) => !columnsToHide.includes(column as keyof T)
      ) as (keyof T)[];
    } else if (columnsToShow) {
      return columnsToShow;
    } else return Object.keys(data[0] as object) as (keyof T)[];
  }, [columnsToHide, columnsToShow, data]);

  const { selectMethods, selectData, uncheckAll } = useADTSelectedData({
    pageSize: 5,
  });

  const [columnsIDs, setColumnsIDs] = useState<ColumnsIds<T>>();

  useEffect(() => {
    const columnsIDs = columns.reduce((acc, column) => {
      acc[column] = `${column as string}-${v4().toString()}`;
      return acc;
    }, {} as ColumnsIds<T>);
    setColumnsIDs(columnsIDs);
  }, [columns]);

  useEffect(() => {
    /* if (selectData.selectedRows.length) {
      const id = toast(
        (t) => (
          <ADTSelectedRowsToast
            highlightColor={highlightColor ?? "#ff0000"}
            tableID={props.tableID}
            selectData={selectData}
            selectedRows={selectData.selectedRows.length}
            toastID={t.id}
            uncheckAll={uncheckAll}
          />
        ),
        { id: selectedRowsToastID ?? undefined }
      );
      setSelectedRowsToastID(id);
    } else {
      toast.dismiss(selectedRowsToastID!);
      setSelectedRowsToastID(null);
    } */
  }, [selectData.selectedRows]);

  return (
    <ADTContext.Provider
      value={{
        selectMethods,
        selectData,
        columnsIDs,
        setColumnsIDs,
        uncheckAll,
        props: {
          ...props,
          columns,
          highlightColor: highlightColor ?? "#ff0000",
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
