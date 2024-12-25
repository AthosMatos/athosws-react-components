import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSTooltip } from "../../../../../ATHOSTooltip";
import { ATHOSColors } from "../../../../../colors/colors";
import { ADTState } from "../../../../redux/store";
import { ADTCellWrapper, borderStyle, bWidth } from "../../../../styled";
import CellExitWrapper, { cellWrapperAnim } from "../ADTCellExitWrapper";
import { ADTCellColumnProps } from "./interfaces";
import useADTCellCol from "./useADTCellCol";

const ADTCellColumn = ({
  row,
  column,
  rowIndex,
  index,
  isLast,
}: ADTCellColumnProps) => {
  const {
    columns,
    colConfig,
    globalConfig,
    startShort,
    tableStyle,
    paddingBetweenColumns,
    paddingBetweenCells,
    persistPrimaryColumn,
  } = useSelector((state: ADTState) => state.ADTPropsReducer);

  const { columnsIDs } = useSelector(
    (state: ADTState) => state.ADTCustomStatesReducer
  );

  const { rowValue, textColor, touch, showTooltip } = useADTCellCol({
    colConfig,
    columns,
    globalConfig,
    column,
    columnsIDs,
    index,
    row,
    rowIndex,
    startShort,
    tableStyle,
  });

  const persistStyle = useMemo(() => {
    if (persistPrimaryColumn && index === 0) {
      const obj = {} as any;
      if (typeof persistPrimaryColumn == "boolean") {
        obj["backgroundColor"] = ATHOSColors.white.eggshell;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] = persistPrimaryColumn.backgroundColor;
        }
        if (persistPrimaryColumn.borderColor) {
          obj["borderRightColor"] = persistPrimaryColumn.borderColor;
          obj["borderRightWidth"] = bWidth;
          obj["borderRightStyle"] = borderStyle;

          if (isLast) {
            obj["borderBottomColor"] = persistPrimaryColumn.borderColor;
            obj["borderBottomWidth"] = bWidth;
            obj["borderBottomStyle"] = borderStyle;
          }
        }
      }
      return obj;
    }
  }, [persistPrimaryColumn]);
  const tdClassName = `${
    persistPrimaryColumn && index === 0
      ? `
        sticky left-[${
          (persistPrimaryColumn as any)?.borderColor ? "2rem" : "1.8rem"
        }]`
      : ""
  } ${isLast ? "rounded-ee-md" : ""}`;

  return (
    <ADTCellWrapper
      id={`${columns[index]} - ${rowIndex} -${index}`}
      className={tdClassName}
      paddingHorizontal={paddingBetweenColumns}
      vertPad={paddingBetweenCells && paddingBetweenCells / 2}
      bRightLeft
      style={{
        color: textColor,
        ...persistStyle,
      }}
      {...cellWrapperAnim}
    >
      {showTooltip ? (
        <ATHOSTooltip
          style={{
            maxWidth: "200px",
          }}
          followCursor
          content={row[column]}
          forceOpen={touch}
        >
          {(ref) => (
            <CellExitWrapper wref={ref}>
              {colConfig && colConfig[column]?.cellComponent
                ? colConfig[column]?.cellComponent!(row[column])
                : rowValue}
            </CellExitWrapper>
          )}
        </ATHOSTooltip>
      ) : colConfig && colConfig[column]?.cellComponent ? (
        colConfig[column]?.cellComponent!(row[column])
      ) : (
        <CellExitWrapper>{rowValue}</CellExitWrapper>
      )}
    </ADTCellWrapper>
  );
};

export default memo(ADTCellColumn);
