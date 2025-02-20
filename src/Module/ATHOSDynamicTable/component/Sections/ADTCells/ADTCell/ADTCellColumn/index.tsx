import { memo } from "react";
import { ATHOSTooltip } from "../../../../../../ATHOSTooltip";
import { ADTCellWrapper } from "../../../../styled";
import { getCellWrapperStyle, tdClassName } from "../../../consts";
import useADTCellCol from "./hooks/main";
import { ADTCellColumnProps } from "./interfaces";
import useSelectors_ADTCellColumn from "./useSelectors";

const ADTCellColumn = ({ row, column, rowIndex, index, isLast }: ADTCellColumnProps) => {
  const { columns, colConfig, paddingBetweenColumns, paddingBetweenCells, persistPrimaryColumn } = useSelectors_ADTCellColumn();

  const { rowValue, textColor, touch, showTooltip, persistStyle } = useADTCellCol({
    column,
    row,
    rowIndex,
    index,
    isLast,
  });

  const cellWrapperProps = {
    id: `${columns[index]} - ${rowIndex} -${index}`,
    className: `${tdClassName(index, persistPrimaryColumn)} ${isLast ? "rounded-ee-md" : ""}`,
    style: {
      color: textColor,
      ...persistStyle,
      ...getCellWrapperStyle({
        //bRightLeft: true,

        paddingHorizontal: index !== 0 ? paddingBetweenColumns : undefined,
        vertPad: paddingBetweenCells && paddingBetweenCells / 2,
        bRight: true,
      }),
    },
  };

  const Cell = colConfig && colConfig[column]?.cellComponent ? colConfig[column]?.cellComponent!(row[column]) : rowValue;

  return (
    <ADTCellWrapper persistent={!!persistPrimaryColumn} {...cellWrapperProps}>
      {/*  <CellExitWrapper>
       
      </CellExitWrapper> */}
      {showTooltip ? (
        <ATHOSTooltip
          style={
            {
              //maxWidth: "200px",
            }
          }
          followCursor
          content={row[column]}
          forceOpen={touch}
        >
          {(ref) => <div ref={ref}>{Cell}</div>}
        </ATHOSTooltip>
      ) : (
        Cell
      )}
    </ADTCellWrapper>
  );
};

export default memo(ADTCellColumn);
