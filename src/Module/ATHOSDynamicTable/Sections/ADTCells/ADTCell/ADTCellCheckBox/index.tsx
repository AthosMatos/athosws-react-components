import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSColors } from "../../../../../colors/colors";
import ADTCheckBox from "../../../../components/ADTCheckBox";
import { useADTSelect } from "../../../../redux/Select/hook";
import { CheckState } from "../../../../redux/Select/interfaces";
import { ADTState } from "../../../../redux/store";
import { ADTCellWrapper, borderStyle, bWidth } from "../../../../styled";
import CellExitWrapper, { cellWrapperAnim } from "../ADTCellExitWrapper";

const ADTCellCheckBox = ({
  rowIndex,
  isLast,
}: {
  rowIndex: number;
  isLast: boolean;
}) => {
  const {
    paddingBetweenCells,
    paddingBetweenColumns,
    tableStyle,
    persistPrimaryColumn,
  } = useSelector((state: ADTState) => state.ADTPropsReducer);
  const { checkState, selectedRows } = useSelector(
    (state: ADTState) => state.ADTSelectReducer
  );
  const { checkCellClick } = useADTSelect();
  const { pageSize, page } = useSelector(
    (state: ADTState) => state.ADTPagingReducer
  );
  const isCheck = useMemo(
    () => selectedRows.includes(rowIndex + (page - 1) * pageSize),
    [selectedRows, rowIndex, page, pageSize]
  );

  const persistStyle = useMemo(() => {
    if (persistPrimaryColumn) {
      const obj = {} as any;
      if (typeof persistPrimaryColumn == "boolean") {
        obj["backgroundColor"] = ATHOSColors.white.eggshell;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] = persistPrimaryColumn.backgroundColor;
        }
        if (persistPrimaryColumn.borderColor) {
          obj["borderLeftColor"] = persistPrimaryColumn.borderColor;
          obj["borderLeftWidth"] = bWidth;
          obj["borderLeftStyle"] = borderStyle;

          if (isLast) {
            obj["borderBottomColor"] = persistPrimaryColumn.borderColor;
            obj["borderBottomWidth"] = bWidth;
            obj["borderBottomStyle"] = borderStyle;
          }
        }
      }
      return obj;
    }
  }, [persistPrimaryColumn]);

  return (
    <ADTCellWrapper
      {...cellWrapperAnim}
      className={`${persistPrimaryColumn ? "sticky left-0" : ""} ${
        isLast ? "rounded-es-md" : ""
      }`}
      style={persistStyle}
      vertPad={paddingBetweenCells && paddingBetweenCells / 2}
      paddingHorizontal={paddingBetweenColumns}
      bLeft
    >
      <CellExitWrapper>
        <ADTCheckBox
          highlightColor={tableStyle?.highlightColor!}
          checked={
            checkState === CheckState.PAGE && isCheck ? checkState : isCheck
          }
          check={() => checkCellClick(rowIndex)}
        />
      </CellExitWrapper>
    </ADTCellWrapper>
  );
};

export default memo(ADTCellCheckBox);
