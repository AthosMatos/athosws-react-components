import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ATHOSColors } from "../../../../../../colors/colors";
import { ADTState } from "../../../../redux/store";
import { borderStyle, bWidth } from "../../../../styled";
import { ADTCellColumnProps } from "./interfaces";

const useADTCellCol = ({
  column,
  index,
  row,
  rowIndex,

  isLast,
}: ADTCellColumnProps & {
  isLast: any;
}) => {
  const columns = useSelector((state: ADTState) => state.ADTPropsReducer.columns);
  const colConfig = useSelector((state: ADTState) => state.ADTPropsReducer.colConfig);
  const globalConfig = useSelector((state: ADTState) => state.ADTPropsReducer.globalConfig);
  const tableStyle = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle);
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);
  const startShort = useSelector((state: ADTState) => state.ADTPropsReducer.startShort);
  const tableName = useSelector((state: ADTState) => state.ADTPropsReducer.tableName);

  const cellId = `${columns[index]} - ${rowIndex} -${index}`;
  const maxCharToCut = globalConfig?.maxCharToCut ? globalConfig.maxCharToCut : colConfig ? colConfig[column]?.maxCharToCut : 20;

  const showTTifShort = globalConfig?.shortOnlyifCut
    ? globalConfig.shortOnlyifCut
    : colConfig
    ? colConfig[column]?.shortOnlyifCut
    : undefined;

  const MWTS = globalConfig?.minColWidthToShort ? globalConfig.minColWidthToShort : colConfig ? colConfig[column]?.minColWidthToShort : 160;

  const [showTooltip, setShowTooltip] = useState(false);
  const [touch, setTouch] = useState(false);
  const [rowValue, setRowValue] = useState(getInitalValue());

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

  function getInitalValue() {
    let rowValue = "";
    if ((typeof startShort === "boolean" && startShort) || (typeof startShort === "object" && startShort[column])) {
      const cut = maxCharToCut && row[column].length > maxCharToCut;
      if (cut) {
        rowValue = `${row[column].slice(0, maxCharToCut)}...`;
      } else rowValue = row[column] as string;
    } else rowValue = row[column] as string;

    return rowValue;
  }

  useEffect(() => {
    if (colConfig && colConfig[column]?.cellComponent) return;

    if (!MWTS) return;
    const DTColDiv = document.getElementById(`${tableName}-${column}-th`);
    if (!DTColDiv) return;

    // Callback function to execute when resize is observed
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;

        if (width < MWTS && !showTooltip) {
          const cut = maxCharToCut && row[column].length > maxCharToCut;
          if (cut) {
            setRowValue(`${row[column].slice(0, maxCharToCut)}...`);
          }
          if (showTTifShort) {
            if (cut) {
              setShowTooltip(true);
            }
          } else setShowTooltip(true);
        } else if (width >= MWTS && showTooltip) {
          setRowValue(row[column] as string);

          showTooltip && setShowTooltip(false);
        }
      }
    };

    // Create a ResizeObserver instance
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(DTColDiv);

    // Cleanup observer on component unmount
    return () => {
      resizeObserver.unobserve(DTColDiv);
      resizeObserver.disconnect();
    };
  }, [showTooltip, maxCharToCut, MWTS]);

  useEffect(() => {
    //on touch set touch to true
    if (!showTTifShort || !showTooltip) return;
    const CellId = document.getElementById(cellId);
    if (!CellId) return;

    const handleTouchStart = () => {
      setTouch(true);
    };
    const handleTouchEnd = () => {
      setTouch(false);
    };

    CellId.addEventListener("touchstart", handleTouchStart);
    CellId.addEventListener("touchend", handleTouchEnd);

    return () => {
      CellId.removeEventListener("touchstart", handleTouchStart);
      CellId.removeEventListener("touchend", handleTouchEnd);
    };
  }, [showTTifShort, showTooltip]);

  const persistStyle = useMemo(() => {
    if (persistPrimaryColumn && index === 0) {
      const obj = {} as any;
      if (typeof persistPrimaryColumn == "boolean") {
        obj["backgroundColor"] = ATHOSColors.white.eggshell_faded;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] = persistPrimaryColumn.backgroundColor;
        }
      }
      const bColor = (persistPrimaryColumn as any).borderColor ?? "rgba(0, 0, 0, 0.13)";
      obj["borderRightColor"] = bColor;
      obj["borderRightWidth"] = bWidth;
      obj["borderRightStyle"] = borderStyle;

      if (isLast) {
        obj["borderBottomColor"] = bColor;
        obj["borderBottomWidth"] = bWidth;
        obj["borderBottomStyle"] = borderStyle;
      }
      return obj;
    }
  }, [persistPrimaryColumn, isLast, index]);

  return {
    textColor,
    showTooltip,
    rowValue,
    touch,
    persistStyle,
  };
};

export default useADTCellCol;
