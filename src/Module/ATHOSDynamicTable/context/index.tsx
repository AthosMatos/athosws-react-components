import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import useADTFilterData from "../hooks/useADTFilterData";
import { DynamicTableProps } from "../interfaces";
import { fillADTProps } from "../redux/props/provider";
import {
  setColH,
  setColsTRId,
  setColumnsIDs,
  setPageSize,
  setTotalItensAmount,
} from "../redux/TableProps/provider";
import { ColumnsIds } from "./interfaces";

export function ADTInit<T>({ props }: { props: DynamicTableProps<T> }) {
  const { data, columnsToHide, columnsToShow, tableStyle } = props;
  const dispatch = useDispatch();

  const columns = useMemo(() => {
    if (columnsToHide) {
      return Object.keys(data[0] as object).filter(
        (column) => !columnsToHide.includes(column as keyof T)
      ) as (keyof T)[];
    } else if (columnsToShow) {
      return columnsToShow;
    } else return Object.keys(data[0] as object) as (keyof T)[];
  }, [columnsToHide, columnsToShow, data]);

  useEffect(() => {
    const columnsIDs = columns.reduce((acc, column) => {
      acc[column] = `${column as string}-${v4().toString()}`;
      return acc;
    }, {} as ColumnsIds<T>);
    dispatch(setColumnsIDs(columnsIDs));
  }, [columns]);

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

  useEffect(() => {
    if (columns.length && filteredData.length) {
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
      dispatch(fillADTProps(pr));
    }
  }, [columns, filteredData]);

  useEffect(() => {
    if (pageSize) dispatch(setPageSize(pageSize));
  }, [pageSize]);

  useEffect(() => {
    if (props.data.length) {
      dispatch(setTotalItensAmount(props.data.length));
    }
  }, [props.data]);

  const [colsTRId] = useMemo(() => [v4()], []);

  useEffect(() => {
    if (colsTRId) {
      dispatch(setColsTRId(colsTRId));
    }
  }, [colsTRId]);

  useEffect(() => {
    const DTColumnWrapperDiv = document.getElementById(colsTRId);
    if (!DTColumnWrapperDiv || !props.paddingHeader) return;
    const h =
      DTColumnWrapperDiv.getBoundingClientRect().height + props.paddingHeader;
    dispatch(setColH(h));
  }, []);
}
