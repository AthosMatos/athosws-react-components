import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../../../redux/store";

export const useTextColor = ({ column, rowIndex, row, extraCol }: { column: string; extraCol?: string; rowIndex: number; row: any }) => {
  const tableStyle = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle);
  const textColor = useMemo(() => {
    const globalColor = tableStyle?.cellTextColor?.global;
    const specificGlobalColor = tableStyle?.cellTextColor?.specific && tableStyle?.cellTextColor?.specific[column]?.global;
    const specificIndexColor =
      tableStyle?.cellTextColor?.specific &&
      tableStyle?.cellTextColor?.specific[column]?.specificIndex &&
      tableStyle?.cellTextColor?.specific[column]?.specificIndex?.indexes.includes(rowIndex) &&
      tableStyle?.cellTextColor?.specific[column]?.specificIndex?.color;
    const specificConditionColor =
      tableStyle?.cellTextColor?.specific &&
      tableStyle?.cellTextColor?.specific[column]?.condional?.showCondition(row[column]) &&
      tableStyle?.cellTextColor?.specific[column]?.condional?.color;

    return specificConditionColor || specificIndexColor || specificGlobalColor || globalColor;
  }, [tableStyle?.cellTextColor]);

  return textColor;
};
