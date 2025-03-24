import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSTooltip } from "../../../../../../ATHOSTooltip";
import { ADTState } from "../../../../redux/store";
import { ADTCellColWrapper } from "../../../../styled";
import { getCellWrapperStyle, tdClassName } from "../../consts";
import useADTCellCol from "./hooks";
import { ADTCellColumnProps } from "./interfaces";

const ADTCellColumn = ({ row, rowIndex, hasExtraCols, index, isLastRow, isCheck, col, isLastCol }: ADTCellColumnProps) => {
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);

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

  const { textColor, touch, showTooltip, persistStyle, Cell } = useADTCellCol({
    column: actualcolumn,
    row,
    rowIndex,
    index,
    isLast: isLastRow,
    isCheck,
    extraCol,
  });
  const selectedColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected);
  const cellWrapperProps = {
    id,
    className: `${tdClassName(index, persistPrimaryColumn)} ${isLastRow && !isCheck ? "rounded-ee-md" : ""}`,
    style: {
      color: textColor,

      ...getCellWrapperStyle({
        //bRight: true,

        paddingHorizontal: index != 0 ? spacingBetweenColumns : undefined,
        vertPad: spacingBetweenCells,
      }),
      borderBottomRightRadius: isLastCol && !hasExtraCols && "6px",
      borderTopRightRadius: isLastCol && !hasExtraCols && "6px",
      left: index === 0 ? "42px" : undefined,
    },
    animate: {
      ...persistStyle,
      ...(isCheck && {
        boxShadow: `0 1px 0 ${selectedColor?.rowBorderColor || "#000"} inset, 0 -1px 0 ${selectedColor?.rowBorderColor || "#000"} inset ${
          isLastCol && !hasExtraCols ? `, -1px 0 0 ${selectedColor?.rowBorderColor || "#000"} inset` : ""
        }`,
      }),
      ...(isCheck && {
        color: selectedColor?.rowTextColor || "inherit",
      }),
    },
  };

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
