import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { ColumnsIds, DynamicTableProps } from "../interfaces";
import {
  setColH,
  setColsTRId,
  setColumnsIDs,
} from "../redux/CustomStates/provider";
import {
  setCanGoBack,
  setCanGoForward,
  setFilteredData,
  setTotalItensAmount,
  setTotalPages,
} from "../redux/Paging/provider";
import { ADTPropsState } from "../redux/props/interfaces";
import { fillADTProps } from "../redux/props/provider";
import { ADTState } from "../redux/store";

export function ADTController<T>({ props }: { props: DynamicTableProps<T> }) {
  const { data, columnsToHide, columnsToShow, paddingHeader, tableStyle } =
    props;
  const dispatch = useDispatch();

  const { page, pageSize } = useSelector(
    (state: ADTState) => state.ADTFilteredPropsReducer
  );
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

  useEffect(() => {
    if (data.length) {
      dispatch(setTotalItensAmount(data.length));
    }
  }, [data]);

  const [colsTRId] = useMemo(() => [v4()], []);

  useEffect(() => {
    if (colsTRId) {
      dispatch(setColsTRId(colsTRId));
    }
  }, [colsTRId]);

  useEffect(() => {
    const DTColumnWrapperDiv = document.getElementById(colsTRId);
    if (!DTColumnWrapperDiv || !paddingHeader) return;
    const h = DTColumnWrapperDiv.getBoundingClientRect().height + paddingHeader;
    dispatch(setColH(h));
  }, [colsTRId]);

  useEffect(() => {
    if (columns?.length) {
      const pr: ADTPropsState<any> = {
        ...props,
        persistPrimaryColumn: props.persistPrimaryColumn ?? true,
        autoLockHeight:
          props.autoLockHeight != undefined ? props.autoLockHeight : true,
        columns,
        tableStyle: {
          ...tableStyle,
          highlightColor: tableStyle?.highlightColor ?? "#ff6262",
        },
      };
      dispatch(fillADTProps(pr));
    }
  }, [columns]);

  useEffect(() => {
    const totalPages = Math.ceil(data?.length / pageSize);
    dispatch(setTotalPages(totalPages));
  }),
    [pageSize, data];

  useEffect(() => {
    const canGoBack = page > 1;
    dispatch(setCanGoBack(canGoBack));
  }, [page]);

  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = data?.slice(start, end);
    dispatch(setFilteredData(paginatedData));

    const canGoForward = page * pageSize < data?.length;
    dispatch(setCanGoForward(canGoForward));
  }, [page, pageSize, data]);
}
