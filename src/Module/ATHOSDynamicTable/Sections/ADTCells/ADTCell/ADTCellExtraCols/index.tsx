import { useSelector } from "react-redux";

import { ADTState } from "../../../../redux/store";
import { ADTCellWrapper } from "../../../../styled";
import { getCellWrapperStyle } from "../../../consts";
import CellExitWrapper from "../ADTCellExitWrapper";

interface ExtraColsProps {
  row: any;
  isPersistPrimaryColumn?: boolean;
}

const ADTCellExtraCols = ({ row, isPersistPrimaryColumn }: ExtraColsProps) => {
  const paddingBetweenCells = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenCells);
  const paddingBetweenColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenColumns);
  const extraColumns = useSelector((state: ADTState) => state.ADTPropsReducer.extraColumns);
  const paddingBetweenExtraColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenExtraColumns);
  const movingPage = useSelector((state: ADTState) => state.ADTPagingReducer.movingPage);

  return (
    !isPersistPrimaryColumn &&
    extraColumns
      ?.filter((extraColumn) => !(extraColumn.showCondition && !extraColumn.showCondition(row)))
      .map((extraColumn, index) => {
        return (
          <ADTCellWrapper
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
            }}
            key={extraColumn.component.toString()}
          >
            <CellExitWrapper>{extraColumn.component(row)}</CellExitWrapper>
          </ADTCellWrapper>
        );
      })
  );
};

export default ADTCellExtraCols;
