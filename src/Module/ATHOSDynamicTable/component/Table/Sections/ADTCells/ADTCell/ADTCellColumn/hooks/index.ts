import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../../../../redux/store";
import { useMobileTouchHandler } from "./useMobileTouchHandler";
import { usePrimaryColHandler } from "./usePrimaryColHandler";
import { useTextColor } from "./useTextColor";

const useADTCellCol = ({
  index,
  row,
  rowIndex,
  isLast,
  isCheck,
  extraCol,
  column,
}: {
  row: any;
  rowIndex: number;
  index: number;
  isCheck?: boolean;
  extraCol?: any;
  column: any;
  isLast: any;
}) => {
  const extraColumns = useSelector((state: ADTState) => state.ADTPropsReducer.extraColumns);
  const colConfig = useSelector((state: ADTState) => state.ADTPropsReducer.colConfig);
  const globalConfig = useSelector((state: ADTState) => state.ADTPropsReducer.globalConfig);
  const startShort = useSelector((state: ADTState) => state.ADTPropsReducer.startShort);
  const short = useSelector((state: ADTState) => state.ADTCustomStatesReducer.columnsShort);
  const [showTooltip, setShowTooltip] = useState(false);

  const textColor = useTextColor({ column, row, rowIndex });
  const touch = useMobileTouchHandler({ index, rowIndex, showTooltip });
  const persistStyle = usePrimaryColHandler({ index, isLast, isCheck });
  const maxCharToCut =
    (extraColumns?.length && extraCol && extraColumns.find((xc) => xc.id == extraCol.split("-isExtraCol-")[1]).maxCharToCut) ||
    (colConfig && colConfig[column]?.maxCharToCut) ||
    globalConfig?.maxCharToCut;
  const className =
    (extraColumns?.length && extraCol && extraColumns.find((xc) => xc.id == extraCol.split("-isExtraCol-")[1]).className) ||
    (colConfig && colConfig[column]?.className);
  const style =
    (extraColumns?.length && extraCol && extraColumns.find((xc) => xc.id == extraCol.split("-isExtraCol-")[1]).style) ||
    (colConfig && colConfig[column]?.style);
  const rowValue = useMemo(() => {
    if (
      typeof row[column] === "string" &&
      ((short && short[column]) ||
        (typeof startShort === "boolean" && startShort) ||
        (typeof startShort === "object" && startShort[column])) &&
      row[column].length > maxCharToCut
    ) {
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
    className,
    style,
  };
};

export default useADTCellCol;
