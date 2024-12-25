import { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { ATHOSColors } from "../../../../colors/colors";
import { ADTState } from "../../../redux/store";
import {
  ADTColBorderWrapper,
  ADTColumnWrapper,
  borderStyle,
  bWidth,
} from "../../../styled";
import ADTBorder from "./ADTBorder";

const ADTCol = ({
  column,
  isPersistPrimaryColumn,
  index,
}: {
  column: string;
  isPersistPrimaryColumn?: boolean;
  index: number;
}) => {
  const { paddingBetweenColumns, tableStyle, colConfig, persistPrimaryColumn } =
    useSelector((state: ADTState) => state.ADTPropsReducer);
  const { columnsIDs } = useSelector(
    (state: ADTState) => state.ADTCustomStatesReducer
  );

  const textColor = useMemo(() => {
    const globalColor = tableStyle?.columnTextColor?.global;
    const specificColor =
      tableStyle?.columnTextColor?.specific &&
      tableStyle?.columnTextColor?.specific[column];

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
        obj["backgroundColor"] = ATHOSColors.white.eggshell;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] = persistPrimaryColumn.backgroundColor;
        }
        if (persistPrimaryColumn.borderColor) {
          obj["borderTopColor"] = persistPrimaryColumn.borderColor;
          obj["borderRightColor"] = persistPrimaryColumn.borderColor;

          obj["borderTopWidth"] = bWidth;
          obj["borderRightWidth"] = bWidth;
          obj["borderTopStyle"] = borderStyle;
          obj["borderRightStyle"] = borderStyle;
        }
      }
      return obj;
    }
  }, [persistPrimaryColumn]);

  return (
    columnsIDs && (
      <ADTColumnWrapper
        className={`${
          persistPrimaryColumn && index === 0
            ? `sticky left-[${
                (persistPrimaryColumn as any)?.borderColor ? "2rem" : "1.8rem"
              }] rounded-se-md`
            : ""
        }`}
        style={persistStyle}
        id={columnsIDs[column]}
        pLeft
        pRight={isPersistPrimaryColumn}
        paddingHorizontal={paddingBetweenColumns}
        textColor={textColor}
      >
        <ADTColBorderWrapper>
          {value}
          {!isPersistPrimaryColumn && <ADTBorder colID={columnsIDs[column]} />}
        </ADTColBorderWrapper>
      </ADTColumnWrapper>
    )
  );
};

export default ADTCol;
