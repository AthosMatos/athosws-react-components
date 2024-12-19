import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import ADTCheckBox from "../../../../components/ADTCheckBox";
import { useADTSelect } from "../../../../redux/Select/hook";
import { CheckState } from "../../../../redux/Select/interfaces";
import { ADTState } from "../../../../redux/store";
import { ADTCellWrapper } from "../../../../styled";

const ADTCellCheckBox = ({
  rowIndex,
  isPersistPrimaryColumn,
}: {
  rowIndex: number;
  isPersistPrimaryColumn?: boolean;
}) => {
  const { paddingBetweenCells, paddingBetweenColumns, tableStyle } =
    useSelector((state: ADTState) => state.ADTPropsReducer);
  const { checkState, selectedRows } = useSelector(
    (state: ADTState) => state.ADTSelectPropsReducer
  );
  const { checkCellClick } = useADTSelect();
  const { pageSize, page } = useSelector(
    (state: ADTState) => state.ADTFilteredPropsReducer
  );
  const isCheck = useMemo(
    () => selectedRows.includes(rowIndex + (page - 1) * pageSize),
    [selectedRows, rowIndex, page, pageSize]
  );

  return (
    <ADTCellWrapper
      style={isPersistPrimaryColumn ? { paddingLeft: "0.4rem" } : {}}
      vertPad={paddingBetweenCells && paddingBetweenCells / 2}
      paddingHorizontal={paddingBetweenColumns}
    >
      <ADTCheckBox
        highlightColor={tableStyle?.highlightColor!}
        checked={
          checkState === CheckState.PAGE && isCheck ? checkState : isCheck
        }
        check={() => checkCellClick(rowIndex)}
      />
    </ADTCellWrapper>
  );
};

export default memo(ADTCellCheckBox);
