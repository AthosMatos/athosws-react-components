import { useSelector } from "react-redux";

import { ADTState } from "../../../../redux/store";
import { ADTCellColWrapper } from "../../../../styled";
import { getCellWrapperStyle } from "../../consts";

interface ExtraColsProps {
  row: any;
  isCheck: boolean;
}

const ADTCellExtraCols = ({ row, isCheck }: ExtraColsProps) => {
  const paddingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);
  const paddingBetweenColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenColumns);
  const extraColumns = useSelector((state: ADTState) => state.ADTPropsReducer.extraCellColumns);
  const paddingBetweenExtraColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenExtraColumns);
  const tableStyle = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle);
  return extraColumns
    ?.filter((extraColumn) => !(extraColumn.showCondition && !extraColumn.showCondition(row)))
    .map((extraColumn, index) => {
      return (
        <ADTCellColWrapper
          /*  variants={movingPage ? undefined : DefaultVariants}
            exit={"unPad"} */
          style={{
            ...getCellWrapperStyle({
              bRightLeft: true,
              paddingHorizontal: paddingBetweenColumns,
              vertPad: paddingBetweenCells && paddingBetweenCells / 2,
            }),
            paddingRight: 0,
            paddingLeft: index == 0 ? 0 : paddingBetweenExtraColumns ?? 6,
            borderBottomRightRadius: "6px",
            borderTopRightRadius: "6px",
          }}
          animate={{
            ...(isCheck && {
              boxShadow: `0 1px 0 ${tableStyle?.selected?.rowBorderColor || "#000"} inset, 0 -1px 0 ${
                tableStyle?.selected?.rowBorderColor || "#000"
              } inset , -1px 0 0 ${tableStyle?.selected?.rowBorderColor || "#000"} inset`,
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
