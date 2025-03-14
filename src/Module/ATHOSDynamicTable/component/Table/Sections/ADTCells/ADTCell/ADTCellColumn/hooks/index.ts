import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../../../../redux/store";
import { ADTCellColumnProps } from "../interfaces";
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
  const short = useSelector((state: ADTState) => state.ADTCustomStatesReducer.columnsShort);
  const [showTooltip, setShowTooltip] = useState(false);

  const textColor = useTextColor({ column, row, rowIndex });
  const touch = useMobileTouchHandler({ index, rowIndex, showTooltip });
  const persistStyle = usePrimaryColHandler({ index, isLast });
  const maxCharToCut = (colConfig && colConfig[column]?.maxCharToCut) || globalConfig?.maxCharToCut;

  const rowValue = useMemo(() => {
    if (
      typeof row[column] === "string" &&
      ((short && short[column]) ||
        (typeof startShort === "boolean" && startShort) ||
        (typeof startShort === "object" && startShort[column]))
    ) {
      if (maxCharToCut && row[column].length <= maxCharToCut) return row[column];
      setShowTooltip(true);
      return row[column].slice(0, maxCharToCut) + "...";
    } else if (maxCharToCut && typeof row[column] === "string" && row[column].length > maxCharToCut) {
      setShowTooltip(true);
      return row[column].slice(0, maxCharToCut) + "...";
    }
    setShowTooltip(false);
    return row[column];
  }, [startShort, row, column, maxCharToCut, short]);

  return {
    textColor,
    showTooltip,
    rowValue,
    touch,
    persistStyle,
  };
};

export default useADTCellCol;
