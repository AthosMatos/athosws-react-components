import { useSelector } from "react-redux";
import { ATHOSTooltip } from "../../../../../ATHOSTooltip";
import { ADTState } from "../../../redux/store";
import { ADTCellColWrapper } from "../../../styled";
import { getCellWrapperStyle, tdClassName } from "../../consts";
import { usePrimaryColHandler } from "../ADTCell/ADTCellColumn/hooks/usePrimaryColHandler";

interface ADTCellColumnV2Props {
  column: string;
  row: any;
  index: number;
  isLast: boolean;
}

const ADTCellColumnV2 = ({ column, row, index, isLast }: ADTCellColumnV2Props) => {
  const { colConfig, paddingBetweenColumns, paddingBetweenCells, persistPrimaryColumn, customCols } = useSelector((state: ADTState) => {
    return {
      colConfig: state.ADTPropsReducer.colConfig,
      paddingBetweenColumns: state.ADTPropsReducer.spacingBetweenColumns,
      paddingBetweenCells: state.ADTPropsReducer.spacingBetweenCells,
      persistPrimaryColumn: state.ADTPropsReducer.persistPrimaryColumn,
      customCols: state.ADTPropsReducer.customColumns,
    };
  });
  const rawValue = row[column];
  const customColumns = customCols?.find((col) => col.newLabel === column)?.render(row);
  const Cell = colConfig && colConfig[column]?.cellComponent ? colConfig[column]?.cellComponent(row[column]) : customColumns || rawValue;
  const persistStyle = usePrimaryColHandler({ index, isLast });
  const cellWrapperProps = {
    className: `${tdClassName(index, persistPrimaryColumn)} ${isLast ? "rounded-ee-md" : ""}`,
    style: {
      /*  color: textColor, */
      ...persistStyle,
      ...getCellWrapperStyle({
        //bRightLeft: true,

        paddingHorizontal: index !== 0 ? paddingBetweenColumns : undefined,
        vertPad: paddingBetweenCells && paddingBetweenCells / 2,
        bRight: true,
      }),
    },
  };
  return (
    <ADTCellColWrapper {...cellWrapperProps}>
      {
        <ATHOSTooltip className="max-w-80" followCursor tooltipContent={rawValue}>
          {Cell}
        </ATHOSTooltip>
      }
    </ADTCellColWrapper>
  );
};

export default ADTCellColumnV2;
