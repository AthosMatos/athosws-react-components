import { memo, useMemo } from "react";
import { ATHOSColors } from "../../../../../../colors/colors";
import ADTCheckBox from "../../../../components/ADTCheckBox";
import { useADTSelect } from "../../../../redux/Select/hook";
import { CheckState } from "../../../../redux/Select/interfaces";
import { ADTCellColWrapper, persistentBorderStyle, persitentBorderWidth } from "../../../../styled";
import { getCellWrapperStyle } from "../../../consts";
import CellExitWrapper from "../ADTCellExitWrapper";
import useSelectors_ADTCellCheckBox from "./useSelectors";

const ADTCellCheckBox = ({ rowIndex, isLast }: { rowIndex: number; isLast: boolean }) => {
  const { checkCellClick } = useADTSelect();
  const { paddingBetweenCells, paddingBetweenColumns, persistPrimaryColumn, tableStyle, checkState, selectedRows, pageSize, page } =
    useSelectors_ADTCellCheckBox();
  const isCheck = useMemo(() => selectedRows.includes(rowIndex + (page - 1) * pageSize), [selectedRows, rowIndex, page, pageSize]);

  const persistStyle = useMemo(() => {
    if (persistPrimaryColumn) {
      const obj = {} as any;
      if (typeof persistPrimaryColumn == "boolean") {
        obj["backgroundColor"] = ATHOSColors.white.eggshell_faded;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] = persistPrimaryColumn.backgroundColor;
        }
      }
      const bColor = (persistPrimaryColumn as any).borderColor ?? "rgba(0, 0, 0, 0.13)";
      obj["borderLeftColor"] = bColor;
      obj["borderLeftWidth"] = persitentBorderWidth;
      obj["borderLeftStyle"] = persistentBorderStyle;

      if (isLast) {
        obj["borderBottomColor"] = bColor;
        obj["borderBottomWidth"] = persitentBorderWidth;
        obj["borderBottomStyle"] = persistentBorderStyle;
      }
      return obj;
    }
  }, [persistPrimaryColumn, isLast]);

  return (
    <ADTCellColWrapper
      persistent={!!persistPrimaryColumn}
      /*  variants={movingPage ? undefined : DefaultVariants}
      exit={"unPad"} */
      className={`${persistPrimaryColumn ? "sticky left-0" : ""} ${isLast ? "rounded-es-md" : ""}`}
      style={{
        ...persistStyle,
        ...getCellWrapperStyle({
          bLeft: !!persistPrimaryColumn,
          //paddingHorizontal: paddingBetweenColumns,
          vertPad: paddingBetweenCells && paddingBetweenCells / 2,
        }),
      }}
    >
      <CellExitWrapper>
        <ADTCheckBox
          highlightColor={tableStyle?.highlightColor!}
          checked={checkState === CheckState.PAGE && isCheck ? checkState : isCheck}
          check={() => checkCellClick(rowIndex)}
        />
      </CellExitWrapper>
    </ADTCellColWrapper>
  );
};

export default memo(ADTCellCheckBox);
