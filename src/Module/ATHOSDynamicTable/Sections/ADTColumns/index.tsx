import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSColors } from "../../../colors/colors";
import ADTCheckBox from "../../components/ADTCheckBox";
import { useADTSelect } from "../../redux/Select/hook";
import { ADTState } from "../../redux/store";
import { ADTColumnWrapper, ADTTR, borderStyle, bWidth } from "../../styled";
import ADTCol from "./ADTCol";

interface ADTColumnsProps {
  isPersistPrimaryColumn?: boolean;
}

const ADTColumns = ({ isPersistPrimaryColumn }: ADTColumnsProps) => {
  const checkState = useSelector(
    (state: ADTState) => state.ADTSelectReducer.checkState
  );
  const { columns, paddingBetweenColumns, tableStyle, persistPrimaryColumn } =
    useSelector((state: ADTState) => state.ADTPropsReducer);
  const { colH, colsTRId } = useSelector(
    (state: ADTState) => state.ADTCustomStatesReducer
  );

  const { checkAllButtonClick } = useADTSelect();

  /* 
  ${
                typeof persistPrimaryColumn == "boolean"
                  ? "bg-slate-500"
                  : `bg-[${persistPrimaryColumn.backgroundColor}]`
              }
  */

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
          obj["borderTopColor"] = persistPrimaryColumn.borderColor;
          obj["borderLeftColor"] = persistPrimaryColumn.borderColor;

          obj["borderTopWidth"] = bWidth;
          obj["borderLeftWidth"] = bWidth;
          obj["borderTopStyle"] = borderStyle;
          obj["borderLeftStyle"] = borderStyle;
        }
      }
      return obj;
    }
  }, [persistPrimaryColumn]);

  return (
    <ADTTR id={colsTRId} height={colH}>
      <ADTColumnWrapper
        className={`${
          persistPrimaryColumn ? `sticky pl-[0.8rem] left-0 rounded-ss-md` : ""
        }`}
        style={persistStyle}
        checkBox
        paddingHorizontal={paddingBetweenColumns}
      >
        <ADTCheckBox
          highlightColor={tableStyle?.highlightColor!}
          checked={checkState}
          check={() => checkAllButtonClick()}
        />
      </ADTColumnWrapper>
      {columns
        ?.filter((_, index) => !(isPersistPrimaryColumn && index > 0))
        .map((column: any, index) => (
          <ADTCol
            index={index}
            key={`${column}-${index}`}
            isPersistPrimaryColumn={isPersistPrimaryColumn}
            column={column}
          />
        ))}
    </ADTTR>
  );
};

export default ADTColumns;
