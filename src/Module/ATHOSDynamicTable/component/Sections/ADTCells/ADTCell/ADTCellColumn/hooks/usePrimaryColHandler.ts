import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSColors } from "../../../../../../../colors/colors";
import { ADTState } from "../../../../../redux/store";
import { persistentBorderStyle, persitentBorderWidth } from "../../../../../styled";

export const usePrimaryColHandler = ({ index, isLast }: { index: number; isLast: boolean }) => {
  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);
  const persistStyle = useMemo(() => {
    if (persistPrimaryColumn && index === 0) {
      const obj = {} as any;
      if (typeof persistPrimaryColumn == "boolean") {
        obj["backgroundColor"] = ATHOSColors.white.eggshell_faded;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] = persistPrimaryColumn.backgroundColor;
        }
      }
      const bColor = (persistPrimaryColumn as any).borderColor ?? "rgba(0, 0, 0, 0.13)";
      obj["borderRightColor"] = bColor;
      obj["borderRightWidth"] = persitentBorderWidth;
      obj["borderRightStyle"] = persistentBorderStyle;

      if (isLast) {
        obj["borderBottomColor"] = bColor;
        obj["borderBottomWidth"] = persitentBorderWidth;
        obj["borderBottomStyle"] = persistentBorderStyle;
      }
      return obj;
    }
  }, [persistPrimaryColumn, isLast, index]);

  return persistStyle;
};
