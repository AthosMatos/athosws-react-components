import { memo } from "react";
import { useSelector } from "react-redux";
import { ATHOSTooltip } from "../../../../../ATHOSTooltip";
import { ADTState } from "../../../../redux/store";
import { ADTCellWrapper } from "../../../../styled";
import { ADTCellColumnProps } from "./interfaces";
import useADTCellCol from "./useADTCellCol";

const ADTCellColumn = ({
  row,
  column,
  rowIndex,
  index,
}: ADTCellColumnProps) => {
  const {
    columns,
    colConfig,
    globalConfig,
    startShort,
    tableStyle,
    paddingBetweenColumns,
    paddingBetweenCells,
  } = useSelector((state: ADTState) => state.ADTPropsReducer);

  const { columnsIDs } = useSelector(
    (state: ADTState) => state.ADTablePropsReducer
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

  return (
    <ADTCellWrapper
      id={`${columns[index]} - ${rowIndex} -${index}`}
      paddingHorizontal={paddingBetweenColumns}
      vertPad={paddingBetweenCells && paddingBetweenCells / 2}
      bRightLeft
      key={index}
      style={{
        color: textColor,
      }}
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
            <div ref={ref}>
              {colConfig && colConfig[column]?.cellComponent
                ? colConfig[column]?.cellComponent!(row[column])
                : rowValue}
            </div>
          )}
        </ATHOSTooltip>
      ) : colConfig && colConfig[column]?.cellComponent ? (
        colConfig[column]?.cellComponent!(row[column])
      ) : (
        rowValue
      )}
    </ADTCellWrapper>
  );
};

export default memo(ADTCellColumn);
