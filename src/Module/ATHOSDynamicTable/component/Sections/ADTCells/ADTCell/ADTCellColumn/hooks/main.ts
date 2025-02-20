import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../../../redux/store";
import { ADTCellColumnProps } from "../interfaces";
import { useColumnResizeHandler } from "./useColumnResizeHandler";
import { useMobileTouchHandler } from "./useMobileTouchHandler";
import { usePrimaryColHandler } from "./usePrimaryColHandler";
import { useTextColor } from "./useTextColor";

const useADTCellCol = ({
  column,
  index,
  row,
  rowIndex,
  isLast,
}: ADTCellColumnProps & {
  isLast: any;
}) => {
  const colConfig = useSelector((state: ADTState) => state.ADTPropsReducer.colConfig);
  const globalConfig = useSelector((state: ADTState) => state.ADTPropsReducer.globalConfig);
  const startShort = useSelector((state: ADTState) => state.ADTPropsReducer.startShort);

  const [showTooltip, setShowTooltip] = useState(false);

  const { short } = useColumnResizeHandler({ column });
  const textColor = useTextColor({ column, row, rowIndex });
  const touch = useMobileTouchHandler({ index, rowIndex, showTooltip });
  const persistStyle = usePrimaryColHandler({ index, isLast });
  const maxCharToCut = (colConfig && colConfig[column]?.maxCharToCut) || globalConfig?.maxCharToCut || 20;

  const rowValue = useMemo(() => {
    if (short) {
      setShowTooltip(true);
      return row[column].slice(0, maxCharToCut) + "...";
    }

    if (
      (typeof startShort === "boolean" && startShort) ||
      (typeof startShort === "object" && startShort[column]) ||
      (row[column] as string).length > maxCharToCut
    ) {
      setShowTooltip(true);
      return row[column].slice(0, maxCharToCut) + "...";
    }
    return row[column] as string;
  }, [startShort, row, column, maxCharToCut]);

  return {
    textColor,
    showTooltip,
    rowValue,
    touch,
    persistStyle,
  };
};

export default useADTCellCol;
