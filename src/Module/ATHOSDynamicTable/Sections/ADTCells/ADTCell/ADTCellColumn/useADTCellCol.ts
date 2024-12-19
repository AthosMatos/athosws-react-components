import { useEffect, useMemo, useState } from "react";
import { ADTCellColumnProps } from "./interfaces";

const useADTCellCol = ({
  column,
  index,
  row,
  rowIndex,
  colConfig,
  columns,
  columnsIDs,
  globalConfig,
  startShort,
  tableStyle,
}: ADTCellColumnProps & {
  columns: string[];
  colConfig: any;
  globalConfig: any;
  startShort: any;
  tableStyle: any;
  columnsIDs: any;
}) => {
  const cellId = `${columns[index]} - ${rowIndex} -${index}`;

  const textColor = useMemo(() => {
    const globalColor = tableStyle?.cellTextColor?.global;
    const specificGlobalColor =
      tableStyle?.cellTextColor?.specific &&
      tableStyle?.cellTextColor?.specific[column]?.global;
    const specificIndexColor =
      tableStyle?.cellTextColor?.specific &&
      tableStyle?.cellTextColor?.specific[column]?.specificIndex &&
      tableStyle?.cellTextColor?.specific[
        column
      ]?.specificIndex?.indexes.includes(rowIndex) &&
      tableStyle?.cellTextColor?.specific[column]?.specificIndex?.color;
    const specificConditionColor =
      tableStyle?.cellTextColor?.specific &&
      tableStyle?.cellTextColor?.specific[column]?.condional?.showCondition(
        row[column]
      ) &&
      tableStyle?.cellTextColor?.specific[column]?.condional?.color;

    return (
      specificConditionColor ||
      specificIndexColor ||
      specificGlobalColor ||
      globalColor
    );
  }, [tableStyle?.cellTextColor]);

  const [showTooltip, setShowTooltip] = useState(false);
  const [rowValue, setRowValue] = useState("");
  const [touch, setTouch] = useState(false);
  const [maxCharToCut, setMaxCharToCut] = useState(
    globalConfig?.maxCharToCut
      ? globalConfig.maxCharToCut
      : colConfig
      ? colConfig[column]?.maxCharToCut
      : false
  );

  const showTTifShort = globalConfig?.shortOnlyifCut
    ? globalConfig.shortOnlyifCut
    : colConfig
    ? colConfig[column]?.shortOnlyifCut
    : undefined;

  const [MWTS, setMWTS] = useState(
    globalConfig?.minColWidthToShort
      ? globalConfig.minColWidthToShort
      : colConfig
      ? colConfig[column]?.minColWidthToShort
      : undefined
  );

  useEffect(() => {
    if (
      (typeof startShort === "boolean" && startShort) ||
      (typeof startShort === "object" && startShort[column])
    ) {
      const mctc = maxCharToCut ?? 20;

      const cut = mctc && row[column].length > mctc;
      if (cut) {
        setRowValue(`${row[column].slice(0, mctc)}...`);
      } else setRowValue(row[column] as string);

      setMaxCharToCut(mctc);
      if (!MWTS) setMWTS(160);
    } else setRowValue(row[column] as string);
  }, []);

  useEffect(() => {
    if (colConfig && colConfig[column]?.cellComponent) return;

    if (!columnsIDs || !MWTS) return;
    const DTColDiv = document.getElementById(columnsIDs[column]);
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
  }, [columnsIDs, showTooltip, maxCharToCut, MWTS]);

  useEffect(() => {
    //on touch set touch to true
    if (!columnsIDs || !showTTifShort || !showTooltip) return;
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
  }, [columnsIDs, showTTifShort, showTooltip]);
  return {
    textColor,
    showTooltip,
    rowValue,
    touch,
  };
};

export default useADTCellCol;
