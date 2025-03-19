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
  const { paddingBetweenCells, persistPrimaryColumn, tableStyle, checkState } = useSelectors_ADTCellCheckBox();
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
  }, [persistPrimaryColumn, isLast, isCheck, highlightColor]);

  return (
    <ADTCellColWrapper
      persistent={!!persistPrimaryColumn}
      className={`${persistPrimaryColumn ? "sticky left-0" : ""} ${isLast ? "rounded-es-md" : ""}`}
      style={{
        ...getCellWrapperStyle({
          bLeft: !!persistPrimaryColumn,
          vertPad: paddingBetweenCells,
        }),
      }}
      animate={{
        ...persistStyle,
        ...(isCheck && {
          boxShadow: `1px 0 0 #000 inset, 0 1px 0 #000 inset, 0 -1px 0 #000 inset`,
          borderTopLeftRadius: "6px",
          borderBottomLeftRadius: "6px",
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
