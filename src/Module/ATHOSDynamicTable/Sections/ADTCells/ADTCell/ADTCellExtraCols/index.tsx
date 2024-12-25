import { useSelector } from "react-redux";

import { ADTState } from "../../../../redux/store";
import { ADTCellWrapper } from "../../../../styled";
import CellExitWrapper, { cellWrapperAnim } from "../ADTCellExitWrapper";

interface ExtraColsProps {
  row: any;
  isPersistPrimaryColumn?: boolean;
}

const ADTCellExtraCols = ({ row, isPersistPrimaryColumn }: ExtraColsProps) => {
  const {
    paddingBetweenCells,
    paddingBetweenColumns,
    extraColumns,
    paddingBetweenExtraColumns,
  } = useSelector((state: ADTState) => state.ADTPropsReducer);

  return (
    !isPersistPrimaryColumn &&
    extraColumns
      ?.filter(
        (extraColumn) =>
          !(extraColumn.showCondition && !extraColumn.showCondition(row))
      )
      .map((extraColumn, index) => {
        return (
          <ADTCellWrapper
            {...cellWrapperAnim}
            style={{
              paddingRight: 0,
              paddingLeft: index == 0 ? 0 : paddingBetweenExtraColumns ?? 6,
            }}
            paddingHorizontal={paddingBetweenColumns}
            vertPad={paddingBetweenCells && paddingBetweenCells / 2}
            bRightLeft
            key={extraColumn.component.toString()}
          >
            <CellExitWrapper>{extraColumn.component(row)}</CellExitWrapper>
          </ADTCellWrapper>
        );
      })
  );
};

export default ADTCellExtraCols;
