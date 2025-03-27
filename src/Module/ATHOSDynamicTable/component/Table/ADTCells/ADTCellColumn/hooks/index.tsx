import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../../redux/store";
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
  const customCols = useSelector((state: ADTState) => state.ADTPropsReducer.customColumns);

  const [showTooltip, setShowTooltip] = useState(false);

  const textColor = useTextColor({ column, row, rowIndex });
  const touch = useMobileTouchHandler({ index, rowIndex, showTooltip });
  const persistStyle = usePrimaryColHandler({ index, isLast, isCheck });
  const maxCharToCut =
    (extraColumns?.length && extraCol && extraColumns.find((xc) => xc.id == extraCol.split("-isExtraCol-")[1])?.maxCharToCut) ||
    (colConfig && colConfig[column]?.maxCharToCut) ||
    globalConfig?.maxCharToCut ||
    10;
  const className =
    (extraColumns?.length && extraCol && extraColumns.find((xc) => xc.id == extraCol.split("-isExtraCol-")[1])?.className) ||
    (colConfig && colConfig[column]?.className);
  const style =
    (extraColumns?.length && extraCol && extraColumns.find((xc) => xc.id == extraCol.split("-isExtraCol-")[1])?.style) ||
    (colConfig && colConfig[column]?.style);

  const hasExtraCol = useMemo(
    () => !!(extraColumns?.length && extraCol && extraColumns.find((exc) => exc.id == extraCol.split("-isExtraCol-")[1])?.cellComponent),
    [extraColumns, extraCol]
  );
  const rowValue = useMemo(() => {
    if (hasExtraCol) return;
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
  }, [startShort, row, column, maxCharToCut, short, hasExtraCol]);

  const cell = useMemo(() => {
    const customColumns = customCols?.find((col) => col.newLabel === column)?.render?.(row);

    if (hasExtraCol) {
      return extraColumns?.find((exc) => exc.id == extraCol.split("-isExtraCol-")[1])?.cellComponent?.(row[column]);
    } else if (colConfig && colConfig[column]?.cellComponent) {
      return colConfig[column]?.cellComponent(row[column]);
    }
    return customColumns || rowValue;
  }, [column, row, colConfig, rowValue, extraColumns, extraCol, hasExtraCol]);

  const Cell = useMemo(() => {
    if (className || style) {
      return (
        <div className={className} style={style}>
          {cell}
        </div>
      );
    }
    return cell;
  }, [className, style, cell]);

  return {
    textColor,
    showTooltip,

    touch,
    persistStyle,

    Cell,
  };
};

export default useADTCellCol;
