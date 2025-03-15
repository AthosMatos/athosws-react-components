import { memo, useMemo } from "react";
import { ATHOSColors } from "../../../../../../../colors/colors";
import ADTCheckBox from "../../../../../components/ADTCheckBox";
import { useADTSelect } from "../../../../../redux/Select/hook";
import { ADTCellColWrapper, persistentBorderStyle, persitentBorderWidth } from "../../../../../styled";
import { getCellWrapperStyle } from "../../../consts";

import { useSelector } from "react-redux";
import { ADTState } from "../../../../../redux/store";
import useSelectors_ADTCellCheckBox from "./useSelectors";

const ADTCellCheckBox = ({ rowId, isLast, isCheck }: { rowId: string; isLast: boolean; isCheck: boolean }) => {
  const { checkCellClick } = useADTSelect();
  const { paddingBetweenCells, paddingBetweenColumns, persistPrimaryColumn, tableStyle, checkState, selectedRows, pageSize, page } =
    useSelectors_ADTCellCheckBox();
  const highlightColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle).highlightColor;
  const persistStyle = useMemo(() => {
    if (persistPrimaryColumn) {
      const obj = {} as any;
      if (typeof persistPrimaryColumn == "boolean") {
        obj["backgroundColor"] = isCheck ? highlightColor : ATHOSColors.white.eggshell_faded;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] = isCheck ? highlightColor : persistPrimaryColumn.backgroundColor;
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
      <ADTCheckBox
        highlightColor={tableStyle?.highlightColor!}
        checked={isCheck === true ? true : checkState}
        check={() => checkCellClick(rowId)}
      />
    </ADTCellColWrapper>
  );
};

export default memo(ADTCellCheckBox);
