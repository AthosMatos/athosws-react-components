import { memo } from "react";
import { useSelector } from "react-redux";
import { ATHOSTooltip } from "../../../../../../ATHOSTooltip";
import { ADTState } from "../../../../redux/store";
import { ADTCellColWrapper } from "../../../../styled";
import { getCellWrapperStyle, tdClassName } from "../../../consts";
import useADTCellCol from "./hooks/main";
import { ADTCellColumnProps } from "./interfaces";
import useSelectors_ADTCellColumn from "./useSelectors";

const ADTCellColumn = ({ row, column, rowIndex, index, isLast, id }: ADTCellColumnProps) => {
  const { colConfig, paddingBetweenColumns, paddingBetweenCells, persistPrimaryColumn } = useSelectors_ADTCellColumn();
  const { rowValue, textColor, touch, showTooltip, persistStyle } = useADTCellCol({
    column,
    row,
    rowIndex,
    index,
    isLast,
  });
  const customCols = useSelector((state: ADTState) => state.ADTPropsReducer.customColumns);

  const cellWrapperProps = {
    id,
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
  const customColumns = customCols?.find((col) => col.newLabel === column)?.render(row);
  const Cell = colConfig && colConfig[column]?.cellComponent ? colConfig[column]?.cellComponent(row[column]) : customColumns || rowValue;
  const tooltipContent = row[column];
  return (
    <ADTCellColWrapper persistent={!!persistPrimaryColumn} {...cellWrapperProps}>
      {showTooltip ? (
        <ATHOSTooltip className="max-w-80" followCursor tooltipContent={tooltipContent} forceOpen={touch}>
          {Cell}
        </ATHOSTooltip>
      ) : (
        Cell
      )}
    </ADTCellColWrapper>
  );
};

export default memo(ADTCellColumn);
