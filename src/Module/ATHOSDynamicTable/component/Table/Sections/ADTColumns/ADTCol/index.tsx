import { ReactNode, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ATHOSColors } from "../../../../../../colors/colors";
import { setColShort } from "../../../../redux/CustomStates/provider";
import { sortDataByColumn } from "../../../../redux/Filtering/provider";
import { ADTState } from "../../../../redux/store";
import { ADTColBorderWrapper, ADTColumnWrapper, persistentBorderStyle, persitentBorderWidth } from "../../../../styled";
import { tdClassName } from "../../consts";
import ADTBorder from "./ADTBorder";
import ColOrderFilter from "./ColOrderFilter";

const ADTCol = ({ column, index }: { column: string; index: number }) => {
  const { colConfig, persistPrimaryColumn, spacingBetweenColumns, showColFilter, tableStyle, boldHeader, paddingHeader, tableName, data } =
    useSelector((state: ADTState) => ({
      spacingBetweenColumns: state.ADTPropsReducer.spacingBetweenColumns,
      persistPrimaryColumn: state.ADTPropsReducer.persistPrimaryColumn,
      tableStyle: state.ADTPropsReducer.tableStyle,
      colConfig: state.ADTPropsReducer.colConfig,
      tableName: state.ADTPropsReducer.tableName,
      paddingHeader: state.ADTPropsReducer.spacingHeader,
      boldHeader: state.ADTPropsReducer.boldHeader,
      data: state.ADTPropsReducer.data,
      showColFilter: state.ADTFilteringReducer.showColOrderFilter,
    }));

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

      obj["borderTopWidth"] = persitentBorderWidth;
      obj["borderRightWidth"] = persitentBorderWidth;
      obj["borderTopStyle"] = persistentBorderStyle;
      obj["borderRightStyle"] = persistentBorderStyle;
      return obj;
    }
  }, [persistPrimaryColumn]);

  const id = `${tableName}-${column}-th`;

  const dispatch = useDispatch();

  const sort = () => {
    showColFilter && dispatch(sortDataByColumn({ column, data }));
  };
  const globalConfig = useSelector((state: ADTState) => state.ADTPropsReducer.globalConfig);
  const minColWidthToShort = (colConfig && colConfig[column]?.minColWidthToShort) || globalConfig?.minColWidthToShort;

  const setcolshort = (short: boolean) => {
    dispatch(setColShort({ column, short }));
  };

  return (
    <ADTColumnWrapper
      paddingBottom={paddingHeader}
      persistent={!!persistPrimaryColumn && index === 0}
      className={`
      ${tdClassName(index, persistPrimaryColumn)}
       rounded-se-md`}
      style={persistStyle}
      id={id}
      paddingHorizontal={index > 0 ? spacingBetweenColumns : undefined}
      textColor={textColor}
    >
      <ADTColBorderWrapper bold={boldHeader}>
        <div className={`flex flex-1 justify-between items-center ${showColFilter ? "cursor-pointer" : ""}`} onClick={sort}>
          {value}

          <ColOrderFilter column={column} />
        </div>
        <ADTBorder minColWidthToShort={minColWidthToShort} colID={id} setcolshort={setcolshort} />
      </ADTColBorderWrapper>
    </ADTColumnWrapper>
  );
};

export default ADTCol;
