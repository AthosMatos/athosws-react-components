import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSTooltip } from "../../../../../../../ATHOSTooltip";
import { ADTState } from "../../../../../redux/store";
import { ADTCellColWrapper } from "../../../../../styled";
import { getCellWrapperStyle, tdClassName } from "../../../consts";
import useADTCellCol from "./hooks";
import { ADTCellColumnProps } from "./interfaces";
import useSelectors_ADTCellColumn from "./useSelectors";

const ADTCellColumn = ({ row, rowIndex, index, isLastRow, isCheck, col, isLastCol }: ADTCellColumnProps) => {
  const { colConfig, persistPrimaryColumn } = useSelectors_ADTCellColumn();
  const customCols = useSelector((state: ADTState) => state.ADTPropsReducer.customColumns);
  const extraColumns = useSelector((state: ADTState) => state.ADTPropsReducer.extraColumns);

  const extraCol = useMemo(() => {
    if (extraColumns?.length && col.includes("-isExtraCol-")) {
      return col as string;
    }
    return undefined;
  }, [col, extraColumns]);

  const actualcolumn = useMemo(() => {
    if (extraColumns?.length && col.includes("-isExtraCol-")) {
      return col.split("-isExtraCol-")[0] as string;
    }
    return col;
  }, [col, extraColumns]);

  const id = `${actualcolumn.toString()} - ${row.uniqueId}`;
  const spacingBetweenColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenColumns);
  const spacingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);

  const { rowValue, textColor, touch, showTooltip, persistStyle, className, style } = useADTCellCol({
    column: actualcolumn,
    row,
    rowIndex,
    index,
    isLast: isLastRow,
    isCheck,
    extraCol,
  });
  const cellWrapperProps = {
    id,
    className: `${tdClassName(index, persistPrimaryColumn)} ${isLastRow && !isCheck ? "rounded-ee-md" : ""}`,
    style: {
      color: textColor,

      ...getCellWrapperStyle({
        //bRight: true,
        paddingHorizontal: spacingBetweenColumns,
        vertPad: spacingBetweenCells,
      }),
      borderBottomRightRadius: isLastCol && "6px",
      borderTopRightRadius: isLastCol && "6px",
    },
    animate: {
      ...persistStyle,
      ...(isCheck && {
        boxShadow: `0 1px 0 #000 inset, 0 -1px 0 #000 inset ${isLastCol ? ", -1px 0 0 #000 inset" : ""}`,
      }),
    },
  };

  const cell = useMemo(() => {
    const customColumns = customCols?.find((col) => col.newLabel === actualcolumn)?.render(row);

    if (extraColumns?.length && extraCol && extraColumns.find((exc) => exc.id == extraCol.split("-isExtraCol-")[1])?.cellComponent) {
      return extraColumns.find((exc) => exc.id == extraCol.split("-isExtraCol-")[1]).cellComponent(row[actualcolumn]);
    } else if (colConfig && colConfig[actualcolumn]?.cellComponent) {
      return colConfig[actualcolumn]?.cellComponent(row[actualcolumn]);
    }
    return customColumns || rowValue;
  }, [actualcolumn, row, colConfig, rowValue, extraColumns, extraCol]);

  const Cell =
    className || style ? (
      <div className={className} style={style}>
        {cell}
      </div>
    ) : (
      cell
    );
  const tooltipContent = row[actualcolumn];

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
