import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { DynamicTableProps } from "../interfaces";
import { setColH, setColsTRId, setTotalItems } from "../redux/CustomStates/provider";
import { setBeingMoved, setFilteredData, setFirstOpen } from "../redux/Paging/provider";
import { ADTPropsState } from "../redux/props/interfaces";
import { fillADTProps } from "../redux/props/provider";

//check if data values have id
const fillIds = (data: any[]) => {
  return data.map((row, index) => {
    if (!row.id) {
      row.id = v4();
    }
    return row;
  });
};

export function ADTStatesController<T>({ props, tableWrapperId }: { props: DynamicTableProps<T>; tableWrapperId: string }) {
  const { data, columnsToHide, columnsToShow, spacingHeader: paddingHeader, tableStyle } = props;
  const dispatch = useDispatch();

  const columns = useMemo(() => {
    if (columnsToHide) {
      return Object.keys(data[0] as object).filter((column) => !columnsToHide.includes(column as keyof T)) as (keyof T)[];
    } else if (columnsToShow) {
      return columnsToShow;
    } else return Object.keys(data[0] as object) as (keyof T)[];
  }, [columnsToHide, columnsToShow, data]);

  /* useEffect(() => {
    const columnsIDs = columns.reduce((acc, column) => {
      acc[column] = `${column as string}-${v4().toString()}`;
      return acc;
    }, {} as ColumnsIds<T>);
    dispatch(setColumnsIDs(columnsIDs));
  }, [columns]); */

  const [colsTRId] = useMemo(() => [v4()], []);

  useEffect(() => {
    if (colsTRId) {
      dispatch(setColsTRId(colsTRId));
    }
  }, [colsTRId]);

  useEffect(() => {
    if (data.length) {
      dispatch(setTotalItems(data.length));
      dispatch(setFilteredData(data));
      dispatch(setBeingMoved(data.map((d: any) => d.id)));
      setTimeout(() => {
        dispatch(setFirstOpen(false));
      }, 100);
    }
  }, [data]);

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
        autoLockHeight: props.autoLockHeight != undefined ? props.autoLockHeight : true,
        columns,
        tableStyle: {
          ...tableStyle,
          highlightColor: tableStyle?.highlightColor ?? "#ff6262",
        },
      };
      dispatch(fillADTProps(pr));
    }
  }, [columns]);

  const [hasXScroll, setHasXScroll] = useState(false);

  useEffect(() => {
    if (!props.persistPrimaryColumn) return;
    const tableWrapper = document.getElementById(tableWrapperId);

    if (!tableWrapper) return;

    function hasScroll(element: HTMLElement) {
      return element.scrollWidth > element.clientWidth;
    }

    const observerCallback: ResizeObserverCallback = (entries: ResizeObserverEntry[]) => {
      window.requestAnimationFrame((): void | undefined => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        if (tableWrapper && hasScroll(tableWrapper)) {
          setHasXScroll(true);
        } else {
          setHasXScroll(false);
        }
      });
    };
    const resizeObserver = new ResizeObserver(observerCallback);

    resizeObserver.observe(tableWrapper);
    return () => {
      resizeObserver.disconnect();
    };
  }, [tableWrapperId]);
}
