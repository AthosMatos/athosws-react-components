import { memo, useMemo } from "react";
import ADTCheckBox from "../../../components/ADTCheckBox";
import { ColumnsIds } from "../../../context";
import { CheckState } from "../../../hooks/useADTSelectedData";
import {
  ColConfig,
  ExtraColumnsI,
  GlobalConfig,
  StartShortI,
  TableStyle,
} from "../../../interfaces";
import { ADTCellWrapper, ADTTR } from "../../../styled";
import ADTCellColumn from "./ADTCellColumn";

interface ADTCellProps {
  isCheck: boolean;
  rowIndex: number;
  row: any;
  columns: any[];
  paddingBetweenCells?: number;
  paddingBetweenColumns?: number;
  tableStyle?: TableStyle<any>;
  isInit: boolean;
  checkCellClick: (row: number) => void;
  checkState: number;
  colConfig?: ColConfig<any>;
  globalConfig?: GlobalConfig;
  extraColumns?: ExtraColumnsI<any>[];
  startShort?: boolean | StartShortI<any>;
  columnsIDs?: ColumnsIds<any>;
  paddingBetweenExtraColumns?: number;
  isPersistPrimaryColumn?: boolean;
}

const ADTCell = memo((props: ADTCellProps) => {
  const {
    isPersistPrimaryColumn,
    isCheck,
    rowIndex,
    row,
    columns,
    paddingBetweenCells,
    paddingBetweenColumns,
    tableStyle,
    checkCellClick,
    checkState,
    isInit,
    colConfig,
    globalConfig,
    extraColumns,
    startShort,
    paddingBetweenExtraColumns,
    columnsIDs,
  } = props;

  return (
    isInit && (
      <ADTTR
        layout="preserve-aspect"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.14 }}
      >
        <ADTCellWrapper
          style={isPersistPrimaryColumn ? { paddingLeft: "0.4rem" } : {}}
          vertPad={paddingBetweenCells && paddingBetweenCells / 2}
          paddingHorizontal={paddingBetweenColumns}
        >
          <ADTCheckBox
            highlightColor={tableStyle?.highlightColor!}
            checked={
              checkState === CheckState.PAGE && isCheck ? checkState : isCheck
            }
            check={() => checkCellClick(rowIndex)}
          />
        </ADTCellWrapper>
        {(columns as any[])
          .filter((column, index) => !(isPersistPrimaryColumn && index > 0))
          .map((column, index) => {
            const textColor = useMemo(() => {
              const globalColor = tableStyle?.cellTextColor?.global;
              const specificGlobalColor =
                tableStyle?.cellTextColor?.specific &&
                tableStyle?.cellTextColor?.specific[column]?.global;
              const specificIndexColor =
                tableStyle?.cellTextColor?.specific &&
                tableStyle?.cellTextColor?.specific[column]?.specificIndex &&
                tableStyle?.cellTextColor?.specific[column]?.specificIndex?.indexes.includes(
                  rowIndex
                ) &&
                tableStyle?.cellTextColor?.specific[column]?.specificIndex?.color;
              const specificConditionColor =
                tableStyle?.cellTextColor?.specific &&
                tableStyle?.cellTextColor?.specific[column]?.condional?.showCondition(
                  row[column]
                ) && tableStyle?.cellTextColor?.specific[column]?.condional?.color;

              return specificConditionColor || specificIndexColor || specificGlobalColor || globalColor;
            }, [tableStyle?.cellTextColor]);
            return (
              <ADTCellWrapper
                id={`${columns[index]} - ${rowIndex} -${index}`}
                paddingHorizontal={paddingBetweenColumns}
                vertPad={paddingBetweenCells && paddingBetweenCells / 2}
                bRightLeft
                key={index}
                style={{
                  color: textColor,
                }}
              >
                <ADTCellColumn
                  cellId={`${columns[index]} - ${rowIndex} -${index}`}
                  columnsIDs={columnsIDs}
                  row={row}
                  column={column}
                  colConfig={colConfig}
                  globalConfig={globalConfig}
                  startShort={startShort}
                />
              </ADTCellWrapper>
            );
          })}
        {extraColumns &&
          !isPersistPrimaryColumn &&
          extraColumns
            .filter(
              (extraColumn) =>
                !(extraColumn.showCondition && !extraColumn.showCondition(row))
            )
            .map((extraColumn, index) => {
              return (
                <ADTCellWrapper
                  style={{
                    paddingRight: 0,
                    paddingLeft:
                      index == 0 ? 0 : paddingBetweenExtraColumns ?? 6,
                  }}
                  paddingHorizontal={paddingBetweenColumns}
                  vertPad={paddingBetweenCells && paddingBetweenCells / 2}
                  bRightLeft
                  key={index}
                >
                  {extraColumn.component}
                </ADTCellWrapper>
              );
            })}
      </ADTTR>
    )
  );
});

export default ADTCell;
