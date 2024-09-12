import { memo, useEffect, useState } from "react";
import { ATHOSTooltip } from "../../../../../ATHOSTooltip";
import { useADTContext } from "../../../../context";
import { ColConfig, GlobalConfig } from "../../../../interfaces";

interface ADTCellColumnProps {
  row: any;
  column: string;
  colConfig?: ColConfig<any>;
  globalConfig?: GlobalConfig;
}

const ADTCellColumn = ({
  row,
  column,
  colConfig,
  globalConfig,
}: ADTCellColumnProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [rowValue, setRowValue] = useState(row[column]);
  const { columnsIDs } = useADTContext();

  useEffect(() => {
    if (colConfig && colConfig[column]?.cellComponent) return;
    const MCWTS = globalConfig?.minColWidthToShort
      ? globalConfig.minColWidthToShort
      : colConfig
      ? colConfig[column]?.minColWidthToShort
      : false;
    const maxCharToCut = globalConfig?.maxCharToCut
      ? globalConfig.maxCharToCut
      : colConfig
      ? colConfig[column]?.maxCharToCut
      : false;

    const showTTifShort = globalConfig?.shortOnlyifCut
      ? globalConfig.shortOnlyifCut
      : colConfig
      ? colConfig[column]?.shortOnlyifCut
      : false;
    if (!columnsIDs || !MCWTS) return;
    const DTColDiv = document.getElementById(columnsIDs[column]);
    if (!DTColDiv) return;

    // Callback function to execute when resize is observed
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;

        if (width < MCWTS && !showTooltip) {
          const cut = maxCharToCut && rowValue.length > maxCharToCut;
          if (cut) {
            setRowValue(`${rowValue.slice(0, maxCharToCut)}...`);
          }
          if (showTTifShort) {
            if (cut) {
              setShowTooltip(true);
            }
          } else setShowTooltip(true);
        } else if (width >= MCWTS && showTooltip) {
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
  }, [columnsIDs, showTooltip]);

  return showTooltip ? (
    <ATHOSTooltip
      toolTipStyle={{
        maxWidth: "200px",
      }}
      position="top"
      float
      content={row[column]}
    >
      {colConfig && colConfig[column]?.cellComponent
        ? colConfig[column]?.cellComponent(rowValue)
        : rowValue}
    </ATHOSTooltip>
  ) : colConfig && colConfig[column]?.cellComponent ? (
    colConfig[column]?.cellComponent(rowValue)
  ) : (
    rowValue
  );
};

export default memo(ADTCellColumn);
