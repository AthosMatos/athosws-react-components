import { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSColors } from "../../../../colors/colors";
import { ADTState } from "../../../redux/store";
import { ADTColBorderWrapper, ADTColumnWrapper, borderStyle, bWidth } from "../../../styled";
import { tdClassName } from "../../consts";
import ADTBorder from "./ADTBorder";
import useSelector_ADTCol from "./useSelector";

const ADTCol = ({ column, index }: { column: string; index: number }) => {
  const { paddingBetweenColumns, persistPrimaryColumn, tableStyle, colConfig } = useSelector_ADTCol();

  const textColor = useMemo(() => {
    const globalColor = tableStyle?.columnTextColor?.global;
    const specificColor = tableStyle?.columnTextColor?.specific && tableStyle?.columnTextColor?.specific[column];

    return specificColor ?? globalColor;
  }, [tableStyle?.columnTextColor]);

  const value = useMemo(() => {
    let v: ReactNode = column;
    if (colConfig) {
      if (colConfig[column]?.colComponent) {
        v = colConfig[column]?.colComponent;
      } else if (colConfig[column]?.label) {
        v = colConfig[column]?.label;
      }
    }
    return v;
  }, [column, colConfig]);

  const persistStyle = useMemo(() => {
    if (persistPrimaryColumn && index === 0) {
      const obj = {} as any;
      if (typeof persistPrimaryColumn === "boolean") {
        obj["backgroundColor"] = ATHOSColors.white.eggshell_faded;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] = persistPrimaryColumn.backgroundColor;
        }
      }

      const bColor = (persistPrimaryColumn as any).borderColor ?? "rgba(0, 0, 0, 0.13)";
      obj["borderTopColor"] = bColor;
      obj["borderRightColor"] = bColor;

      obj["borderTopWidth"] = bWidth;
      obj["borderRightWidth"] = bWidth;
      obj["borderTopStyle"] = borderStyle;
      obj["borderRightStyle"] = borderStyle;
      return obj;
    }
  }, [persistPrimaryColumn]);

  const tableName = useSelector((state: ADTState) => state.ADTPropsReducer.tableName);

  const id = `${tableName}-${column}-th`;
  const paddingHeader = useSelector((state: ADTState) => state.ADTPropsReducer.spacingHeader);
  const boldHeader = useSelector((state: ADTState) => state.ADTPropsReducer.boldHeader);

  return (
    <ADTColumnWrapper
      paddingBottom={paddingHeader}
      persistent={!!persistPrimaryColumn && index === 0}
      className={`
      ${tdClassName(index, persistPrimaryColumn)}
       rounded-se-md`}
      style={persistStyle}
      id={id}
      /*  pLeft={index === 0 && !!persistPrimaryColumn}
      pRight={!!persistPrimaryColumn} */
      paddingHorizontal={index > 0 ? paddingBetweenColumns : undefined}
      textColor={textColor}
    >
      <ADTColBorderWrapper bold={boldHeader}>
        {value}
        <ADTBorder colID={id} />
      </ADTColBorderWrapper>
    </ADTColumnWrapper>
  );
};

export default ADTCol;
