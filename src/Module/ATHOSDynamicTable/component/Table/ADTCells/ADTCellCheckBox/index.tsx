import { memo, useMemo } from "react";
import { ATHOSColors } from "../../../../../colors/colors";
import ADTCheckBox from "../../../components/ADTCheckBox";
import { useADTSelect } from "../../../redux/Select/hook";
import { ADTCellColWrapper, persistentBorderStyle, persitentBorderWidth } from "../../../styled";
import { getCellWrapperStyle } from "../../funcs";

import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";
import useSelectors_ADTCellCheckBox from "./useSelectors";

const ADTCellCheckBox = ({ rowId, isLast, isCheck, index }: { rowId: string; index: number; isLast: boolean; isCheck: boolean }) => {
  const { checkCellClick } = useADTSelect();
  const { paddingBetweenCells, persistPrimaryColumn, checkState } = useSelectors_ADTCellCheckBox();
  const selectedColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle)?.selected;
  const persistStyle = useMemo(() => {
    if (persistPrimaryColumn) {
      const obj = {} as any;
      if (typeof persistPrimaryColumn == "boolean") {
        obj["backgroundColor"] = isCheck && selectedColor?.rowColor ? selectedColor?.rowColor : ATHOSColors.white.eggshell_faded;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] = isCheck && selectedColor?.rowColor ? selectedColor?.rowColor : persistPrimaryColumn.backgroundColor;
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
  }, [persistPrimaryColumn, isLast, isCheck, selectedColor]);

  const rowSpacingColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected?.rowSpacingColor);
  const rowBorderColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected?.rowBorderColor);
  const rowColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.selected?.rowColor);
  return (
    <ADTCellColWrapper
      persistent={!!persistPrimaryColumn}
      className={`${persistPrimaryColumn ? "sticky left-0" : ""} ${isLast ? "rounded-es-md" : ""}`}
      style={{
        ...getCellWrapperStyle({
          bRightLeft: true,
        }),
        borderColor: typeof persistPrimaryColumn == "object" ? persistPrimaryColumn.backgroundColor : rowSpacingColor,
        borderTopWidth: paddingBetweenCells,
        ...persistStyle,
      }}
      animate={{
        ...(isCheck && {
          boxShadow: `1px 0 0 ${rowBorderColor || rowColor} inset, 0 1px 0 ${rowBorderColor || rowColor} inset, 0 -1px 0 ${
            rowBorderColor || rowColor
          } inset`,
        }),
      }}
    >
      <ADTCheckBox isRow checked={isCheck === true ? true : checkState} check={() => checkCellClick(rowId)} />
    </ADTCellColWrapper>
  );
};

export default memo(ADTCellCheckBox);
