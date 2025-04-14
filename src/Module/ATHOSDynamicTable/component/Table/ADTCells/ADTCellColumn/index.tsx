import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSTooltip } from "../../../../../ATHOSTooltip";
import { ADTState } from "../../../redux/store";
import { ADTCellColWrapper } from "../../../styled";
import { getCellWrapperStyle, tdClassName } from "../../funcs";
import useADTCellCol from "./hooks";
import { ADTCellColumnProps } from "./interfaces";

const ADTCellColumn = ({ row, rowIndex, hasExtraCols, index, isLastRow, isCheck, col, isLastCol }: ADTCellColumnProps) => {
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);
  const extraColumns = useSelector((state: ADTState) => state.ADTPropsReducer.extraColumns);
  const spacingBetweenColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenColumns);
  const spacingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);
  const selectedColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected);
  const rowSpacingColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected?.rowSpacingColor);
  const rowColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected?.rowColor);
  const rowBorderColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected?.rowBorderColor);
  const paddingInCells = useSelector((state: ADTState) => state.ADTPropsReducer.paddingInCells);

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

  const { textColor, touch, showTooltip, persistStyle, Cell } = useADTCellCol({
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
      paddingTop: paddingInCells,
      paddingBottom: paddingInCells,
      ...getCellWrapperStyle({
        //bRight: true,

        paddingHorizontal: index != 0 ? spacingBetweenColumns : undefined,
      }),
      /* borderBottomRightRadius: isLastCol && !hasExtraCols && "6px",
      borderTopRightRadius: isLastCol && !hasExtraCols && "6px", */
      left: index === 0 ? "36px" : undefined,
      borderTopColor: index === 0 && typeof persistPrimaryColumn == "object" ? persistPrimaryColumn.backgroundColor : rowSpacingColor,
      borderTopWidth: spacingBetweenCells,
      ...persistStyle,
    },
    animate: {
      ...(isCheck && {
        boxShadow: `0 1px 0 ${rowBorderColor || rowColor} inset, 0 -1px 0  ${rowBorderColor || rowColor} inset ${
          isLastCol && !hasExtraCols ? `, -1px 0 0 ${rowBorderColor || rowColor} inset` : ""
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
