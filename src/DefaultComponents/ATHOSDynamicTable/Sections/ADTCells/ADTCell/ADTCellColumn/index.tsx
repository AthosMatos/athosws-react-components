import { useEffect, useState } from "react";
import { ATHOSTooltip } from "../../../../../ATHOSTooltip";
import { useADTContext } from "../../../../context";

const ADTCellColumn = ({ row, column }: { row: any; column: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [rowValue, setRowValue] = useState(row[column] as string);
  const { columnsIDs } = useADTContext();

  const {
    props: { colConfig, globalConfig },
  } = useADTContext();

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

  useEffect(() => {
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
      {rowValue}
    </ATHOSTooltip>
  ) : (
    rowValue
  );
};

export default ADTCellColumn;
