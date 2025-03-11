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
      uniqueId: v4(),
    };
  });
};

export function ADTStatesController<T>({ props }: { props: DynamicTableProps<T> }) {
  const { data, columnsToHide, columnsToShow, customColumns, tableStyle, columnOrder } = props;
  const dispatch = useDispatch();

  const columns = useMemo(() => {
    if (!data || !data.length) return [];
    let cols: (keyof T)[] = [];
    if (columnsToHide) {
      cols = Object.keys(data[0] as object).filter((column) => !columnsToHide.includes(column as keyof T)) as (keyof T)[];
    } else if (columnsToShow) {
      cols = columnsToShow;
    } else cols = Object.keys(data[0] as object) as (keyof T)[];

    if (columnOrder) {
      cols = cols.filter((col) => !columnOrder.includes(col));
      cols = [...columnOrder, ...cols];
    }

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
    return cols;
  }, [columnsToHide, columnsToShow, data]);

  useEffect(() => {
    const pr: ADTPropsState<any> = {
      ...props,
      persistPrimaryColumn: props.persistPrimaryColumn ?? true,
      tableStyle: {
        ...tableStyle,
        highlightColor: tableStyle?.highlightColor ?? "#ff6262",
      },
    };
    dispatch(fillADTProps(pr));
  }, [props]);

  useEffect(() => {
    if (columns?.length && data?.length) {
      dispatch(setFilteredColumns(columns));
      dispatch(setColumns(columns));
      dispatch(setTotalItems(data.length));
      dispatch(setFilteredData(fillIds(data)));
    }
  }, [columns]);
}
