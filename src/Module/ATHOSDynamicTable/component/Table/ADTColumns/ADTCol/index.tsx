import { ReactNode, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ATHOSColors } from "../../../../../colors/colors";
import { setColShort } from "../../../redux/CustomStates/provider";
import { sortDataByColumn } from "../../../redux/Filtering/provider";
import { ADTState } from "../../../redux/store";
import { ADTColBorderWrapper, ADTColumnWrapper, persistentBorderStyle, persitentBorderWidth } from "../../../styled";
import { tdClassName } from "../../funcs";
import ADTBorder from "./ADTBorder";
import ColOrderFilter from "./ColOrderFilter";

const ADTCol = ({ column, index }: { column: string; index: number }) => {
  const { colConfig, persistPrimaryColumn, spacingBetweenColumns, extraColumns, tableStyle, boldHeader, paddingHeader, tableName, data } =
    useSelector((state: ADTState) => ({
      spacingBetweenColumns: state.ADTPropsReducer.spacingBetweenColumns,
      persistPrimaryColumn: state.ADTPropsReducer.persistPrimaryColumn,
      tableStyle: state.ADTPropsReducer.tableStyle,
      colConfig: state.ADTPropsReducer.colConfig,
      tableName: state.ADTPropsReducer.tableName,
      paddingHeader: state.ADTPropsReducer.spacingHeader,
      boldHeader: state.ADTPropsReducer.boldColumns,
      data: state.ADTPropsReducer.data,
      extraColumns: state.ADTPropsReducer.extraColumns,
    }));
  const globalConfig = useSelector((state: ADTState) => state.ADTPropsReducer.globalConfig);
  const minColWidthToShort = (colConfig && colConfig[column]?.minColWidthToShort) || globalConfig?.minColWidthToShort;

  const textColor = useMemo(() => {
    const globalColor = tableStyle?.columnTextColor?.global;
    const specificColor = tableStyle?.columnTextColor?.specific && tableStyle?.columnTextColor?.specific[column];

    return specificColor ?? globalColor;
  }, [tableStyle?.columnTextColor]);

  const value = useMemo(() => {
    let v: ReactNode = column;
    if (extraColumns?.length && column.includes("-isExtraCol-")) {
      const colId = column.split("-isExtraCol-")[1];

      v = extraColumns.find((col) => col.id === colId)?.label;
    } else if (colConfig && colConfig[column]?.label) {
      v = colConfig[column]?.label;
    }

    return v;
  }, [column, colConfig, extraColumns]);

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
    dispatch(sortDataByColumn({ column, data }));
  };

  const setcolshort = (short: boolean) => {
    dispatch(setColShort({ column, short }));
  };

  return (
    <ADTColumnWrapper
      persistent={!!persistPrimaryColumn && index === 0}
      className={`
      ${tdClassName(index, persistPrimaryColumn)}
       rounded-se-md`}
      style={{
        ...persistStyle,
        //left: index === 0 ? "42px" : undefined,
        paddingBottom: paddingHeader,
        paddingLeft: index > 0 ? spacingBetweenColumns : undefined,
        paddingRight: index > 0 ? spacingBetweenColumns : undefined,
      }}
      id={id}
      textColor={textColor}
    >
      <ADTColBorderWrapper bold={boldHeader}>
        <div className={`flex flex-1 justify-between items-center cursor-pointer`} onClick={sort}>
          {value}

          <ColOrderFilter column={column} />
        </div>
        <ADTBorder minColWidthToShort={minColWidthToShort} colID={id} setcolshort={setcolshort} />
      </ADTColBorderWrapper>
    </ADTColumnWrapper>
  );
};

export default ADTCol;
