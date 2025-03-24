import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSTooltip } from "../../../../../../../ATHOSTooltip";
import { ADTState } from "../../../../../redux/store";
import { ADTCellColWrapper } from "../../../../../styled";
import { getCellWrapperStyle, tdClassName } from "../../../consts";
import useADTCellCol from "./hooks";
import { ADTCellColumnProps } from "./interfaces";

const ADTCellColumn = ({ row, rowIndex, index, isLastRow, isCheck, col, isLastCol }: ADTCellColumnProps) => {
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
      borderBottomRightRadius: isLastCol && "6px",
      borderTopRightRadius: isLastCol && "6px",
      left: index === 0 ? "42px" : undefined,
    },
    animate: {
      ...persistStyle,
      ...(isCheck && {
        boxShadow: `0 1px 0 #000 inset, 0 -1px 0 #000 inset ${isLastCol ? ", -1px 0 0 #000 inset" : ""}`,
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
