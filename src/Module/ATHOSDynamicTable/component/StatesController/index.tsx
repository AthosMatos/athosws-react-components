import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { ColumnsIds, DynamicTableProps } from "../interfaces";
import { setTotalItems } from "../redux/CustomStates/provider";
import { setFilteredColumns, setFilteredData } from "../redux/Filtering/provider";
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

  const columnsIDs = useMemo(()=>columns.reduce((acc, column) => {
    acc[column] = `${column as string}-${v4()}`;
    return acc;
  }, {} as ColumnsIds<T>),[columns]);

  

  useEffect(() => {
    if (data.length) {
      dispatch(setTotalItems(data.length));
      dispatch(setFilteredData(data));
    }
  }, [data]);

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
  }, [columns, props]);

  useEffect(() => {
    if (columns?.length) {
      dispatch(setFilteredColumns(columns));
    }
  }, [columns]);

  useEffect(() => {
    if (data.length) {
      dispatch(setFilteredData(fillIds(data)));
    }
  }, [columnsIDs]);

  /* const [hasXScroll, setHasXScroll] = useState(false);

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
  }, [tableWrapperId]); */
}
