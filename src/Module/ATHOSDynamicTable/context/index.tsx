import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import useADTFilterData from "../hooks/useADTFilterData";
import useADTSelectedData from "../hooks/useADTSelectedData";
import { DynamicTableProps } from "../interfaces";
import { fillProps } from "../redux/props/provider";
import { ADTContextProps, ColumnsIds } from "./interfaces";

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

  const tableRef = useRef<any>(null);
  const {
    changePageSize,
    filterBySearch,
    filteredData,
    movePage,
    page,
    pageSize,
    searchFilter,
    moving,
    canGoBack,
    canGoForward,
    totalPages,
  } = useADTFilterData({
    data,
    movePageTransitionDuration: props.movePageTransitionDuration,
  });

  const {
    selectMethods,
    selectData,
    uncheckAll,
    selectedRowsToastOpen,
    setSelectedRowsToastOpen,
  } = useADTSelectedData({
    pageSize,
    totalItensAmount: props.data.length,
  });

  const [columnsIDs, setColumnsIDs] = useState<ColumnsIds<T>>();
  const [colsTRId, setColsTRId] = useState<string>(v4());
  const [rowHeight, setRowHeight] = useState<number>(0);

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

  useEffect(() => {
    if (tableRef.current) {
      setTimeout(() => {
        setRowHeight(tableRef.current?.clientHeight);
      }, 100);
    }
  }, [tableRef.current, pageSize]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (columns.length && filteredData.length) {
      console.log("fillProps");
      const pr = {
        ...props,
        autoLockHeight:
          props.autoLockHeight != undefined ? props.autoLockHeight : true,
        columns,
        data: filteredData,
        originalData: data,
        tableStyle: {
          ...tableStyle,
          highlightColor: tableStyle?.highlightColor ?? "#ff6262",
        },
      };
      dispatch(fillProps(pr));
    }
  }, [columns, filteredData]);

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
        tableRef,
        rowHeight,
        pageState: {
          page,
          pageSize,
          changePageSize,
          movePage,
          moving,
          canGoBack,
          canGoForward,
          totalPages,
          filterBySearch,
        },
        props: {
          ...props,
          autoLockHeight:
            props.autoLockHeight != undefined ? props.autoLockHeight : true,
          columns,
          data: filteredData,
          originalData: data,
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
