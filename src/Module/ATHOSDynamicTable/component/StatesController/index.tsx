import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { DynamicTableProps } from "../interfaces";
import { setTotalItems } from "../redux/CustomStates/provider";
import { setFilteredColumns, setFilteredData } from "../redux/Filtering/provider";
import { ADTPropsState } from "../redux/props/interfaces";
import { fillADTProps, setColumns } from "../redux/props/provider";

//check if data values have id
const fillIds = (data: any[]) => {
  return data.map((row) => {
    return {
      ...row,
      uniqueId: row.uniqueId || v4(),
    };
  });
};

export function ADTStatesController<T>({ props }: { props: DynamicTableProps<T> }) {
  const { data, columnsToHide, columnsToShow, customColumns, tableStyle, columnOrder, extraColumns } = props;
  const dataWithIds = useMemo(() => {
    if (data && data.length) return fillIds(data);
    return data;
  }, [data]);
  const dispatch = useDispatch();

  const xtraCols = useMemo(() => {
    return extraColumns?.length
      ? extraColumns.map((exc) => {
          return {
            ...exc,
            id: exc.id ?? v4(),
          };
        })
      : undefined;
  }, [extraColumns]);

  const columns = useMemo(() => {
    if (!data || !data.length) return [];
    let cols: (keyof T)[] = [];
    if (columnsToHide) {
      cols = Object.keys(data[0] as object).filter((column) => !columnsToHide.includes(column as keyof T)) as (keyof T)[];
    } else if (columnsToShow) {
      cols = columnsToShow;
    } else cols = Object.keys(data[0] as object) as (keyof T)[];

    if (customColumns) {
      customColumns.forEach((customColumn) => {
        cols = cols.filter((col) => !customColumn.colsToGet.includes(col));
        if (customColumn.index != undefined) {
          cols.splice(customColumn.index, 0, customColumn.newLabel as keyof T);
        } else {
          cols.push(customColumn.newLabel as keyof T);
        }
      });
    }
    if (xtraCols?.length) {
      cols.push(...xtraCols.map((col) => `${col.column as any}-isExtraCol-${col.id}` as any));
    }

    if (columnOrder) {
      cols = cols.filter((col) => !columnOrder.includes(col));
      cols = [...columnOrder, ...cols];
    }
    return cols;
  }, [columnsToHide, columnsToShow, data, customColumns, columnOrder, xtraCols]);

  useEffect(() => {
    const pr: ADTPropsState<any> = {
      ...props,
      data: dataWithIds,
      persistPrimaryColumn: props.persistPrimaryColumn ?? true,
      extraColumns: xtraCols,
      tableStyle: {
        ...tableStyle,
        //highlightColor: tableStyle?.highlightColor ?? "#bcdfff",
      },
      columns,
    };
    dispatch(fillADTProps(pr));
  }, [props]);

  useEffect(() => {
    if (columns?.length && data?.length) {
      dispatch(setFilteredColumns(columns));
      dispatch(setColumns(columns));
      dispatch(setTotalItems(data.length));
      dispatch(setFilteredData(dataWithIds));
    }
  }, [columns]);
}
