import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { ColumnsIds, DynamicTableProps } from "../interfaces";
import {
  setColH,
  setColsTRId,
  setColumnsIDs,
  setTotalItems,
} from "../redux/CustomStates/provider";
import { ADTPropsState } from "../redux/props/interfaces";
import { fillADTProps } from "../redux/props/provider";
import { setFilteredData } from "../redux/Paging/provider";

//check if data values have id
const fillIds = (data: any[]) => {
  return data.map((row, index) => {
    if (!row.id) {
      row.id = v4();
    }
    return row;
  });
};

export function ADTStatesController<T>({
  props,
}: {
  props: DynamicTableProps<T>;
}) {
  const { data, columnsToHide, columnsToShow, paddingHeader, tableStyle } =
    props;
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
}
