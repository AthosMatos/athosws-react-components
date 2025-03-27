import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSColors } from "../../../../../colors/colors";
import ADTCheckBox from "../../../components/ADTCheckBox";
import { useADTSelect } from "../../../redux/Select/hook";
import { ADTState } from "../../../redux/store";
import { ADTColumnWrapper, persistentBorderStyle, persitentBorderWidth } from "../../../styled";
import { getCellWrapperStyle } from "../../funcs";

const ADTColCheckBox = () => {
  const checkState = useSelector((state: ADTState) => state.ADTSelectReducer.checkState);

  const persistPrimaryColumn = useSelector((state: ADTState) => state.ADTPropsReducer.persistPrimaryColumn);

  const { checkAllButtonClick } = useADTSelect();

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
      obj["borderTopColor"] = bColor;
      obj["borderLeftColor"] = bColor;

      obj["borderTopWidth"] = persitentBorderWidth;
      obj["borderLeftWidth"] = persitentBorderWidth;
      obj["borderTopStyle"] = persistentBorderStyle;
      obj["borderLeftStyle"] = persistentBorderStyle;
      return obj;
    }
  }, [persistPrimaryColumn]);
  const paddingHeader = useSelector((state: ADTState) => state.ADTPropsReducer.spacingHeader);

  return (
    <ADTColumnWrapper
      persistent={!!persistPrimaryColumn}
      className={`${persistPrimaryColumn ? `sticky pl-[0.8rem] left-0 rounded-ss-md` : ""}`}
      style={{
        ...persistStyle,
        ...getCellWrapperStyle({
          bRightLeft: true,
        }),
        paddingBottom: paddingHeader,
      }}
      checkBox
      pRight
      //paddingHorizontal={paddingBetweenColumns}
    >
      <ADTCheckBox checked={checkState} check={() => checkAllButtonClick()} />
    </ADTColumnWrapper>
  );
};

export default memo(ADTColCheckBox);
