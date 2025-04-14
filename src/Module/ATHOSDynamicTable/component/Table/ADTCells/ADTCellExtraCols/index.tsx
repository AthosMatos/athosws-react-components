import { useSelector } from "react-redux";

import { ADTState } from "../../../redux/store";
import { ADTCellColWrapper } from "../../../styled";
import { getCellWrapperStyle } from "../../funcs";
import { usePrimaryColHandler } from "../ADTCellColumn/hooks/usePrimaryColHandler";

interface ExtraColsProps {
  row: any;
  isCheck: boolean;
  onlyOneLeft?: boolean;
  isLast: boolean;
}

const ADTCellExtraCols = ({ row, isCheck, onlyOneLeft, isLast }: ExtraColsProps) => {
  const paddingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);
  const paddingBetweenColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenColumns);
  const paddingBetweenExtraColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenExtraColumns);
  const tableStyle = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle);
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);
  const rowSpacingColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected?.rowSpacingColor);
  const spacingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);
  const extraColumns = useSelector((state: ADTState) => state.ADTPropsReducer.extraCellColumns);

  const selectedColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected);

  return extraColumns
    ?.filter((extraColumn) => !(extraColumn.showCondition && !extraColumn.showCondition(row)))
    .map((extraColumn, index) => {
      const persistStyle = usePrimaryColHandler({ index: onlyOneLeft ? 0 : 1, isLast, isCheck });
      const center = extraColumn.center === false ? false : true;
      return (
        <ADTCellColWrapper
          className={`${center ? "text-center" : "text-start"}`}
          style={{
            ...getCellWrapperStyle({
              bRightLeft: true,
              paddingHorizontal: paddingBetweenColumns,
            }),
            paddingRight: 0,
            paddingLeft: index == 0 ? 0 : paddingBetweenExtraColumns ?? 6,
            /*  borderBottomRightRadius: "6px",
            borderTopRightRadius: "6px", */
            borderTopColor: onlyOneLeft && typeof persistPrimaryColumn == "object" ? persistPrimaryColumn.backgroundColor : rowSpacingColor,
            borderTopWidth: spacingBetweenCells,
          }}
          animate={{
            ...persistStyle,
            ...(isCheck && {
              boxShadow: `0 1px 0 ${tableStyle?.selected?.rowBorderColor || "#000"} inset, 0 -1px 0 ${
                tableStyle?.selected?.rowBorderColor || "#000"
              } inset , -1px 0 0 ${tableStyle?.selected?.rowBorderColor || "#000"} inset`,
            }),
            ...(isCheck && {
              color: selectedColor?.rowTextColor || "inherit",
            }),
          }}
          key={extraColumn.component.toString()}
        >
          {extraColumn.component(row)}
        </ADTCellColWrapper>
      );
    });
};

export default ADTCellExtraCols;
