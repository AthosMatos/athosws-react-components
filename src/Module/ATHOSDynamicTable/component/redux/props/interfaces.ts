import { DynamicTableProps } from "../../interfaces";

export interface ADTPropsState<T> extends DynamicTableProps<T> {
  columns: any[];
}
