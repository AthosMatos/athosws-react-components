import { memo } from "react";
import ADTCheckBox from "../../../components/ADTCheckBox";
import { ColumnsIds } from "../../../context";
import { CheckState } from "../../../hooks/useADTSelectedData";
import {
  ColConfig,
  ExtraColumnsI,
  GlobalConfig,
  StartShortI,
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
  highlightColor?: string;
  isInit: boolean;
  checkCellClick: (row: number) => void;
  checkState: number;
  colConfig?: ColConfig<any>;
  globalConfig?: GlobalConfig;
  extraColumns?: ExtraColumnsI<any>[];
  startShort?: boolean | StartShortI<any>;
  columnsIDs?: ColumnsIds<any>;
  paddingBetweenExtraColumns?: number;
}

const ADTCell = memo((props: ADTCellProps) => {
  const {
    isCheck,
    rowIndex,
    row,
    columns,
    paddingBetweenCells,
    paddingBetweenColumns,
    highlightColor,
    checkCellClick,
    checkState,
    isInit,
    colConfig,
    globalConfig,
    extraColumns,
    startShort,
    paddingBetweenExtraColumns,
  } = props;

  return (
    isInit && (
      <ADTTR
        layout="preserve-aspect"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.14 }}
      >
        <ADTCellWrapper
          vertPad={paddingBetweenCells && paddingBetweenCells / 2}
          paddingHorizontal={paddingBetweenColumns}
        >
          <ADTCheckBox
            highlightColor={highlightColor!}
            checked={
              checkState === CheckState.PAGE && isCheck ? checkState : isCheck
            }
            check={() => checkCellClick(rowIndex)}
          />
        </ADTCellWrapper>
        {(columns as any[]).map((column, index) => (
          <ADTCellWrapper
            id={`${columns[index]} - ${rowIndex} -${index}`}
            paddingHorizontal={paddingBetweenColumns}
            vertPad={paddingBetweenCells && paddingBetweenCells / 2}
            bRightLeft
            key={index}
          >
            <ADTCellColumn
              cellId={`${columns[index]} - ${rowIndex} -${index}`}
              columnsIDs={props.columnsIDs}
              row={row}
              column={column}
              colConfig={colConfig}
              globalConfig={globalConfig}
              startShort={startShort}
            />
          </ADTCellWrapper>
        ))}
        {extraColumns &&
          extraColumns.map((extraColumn, index) => {
            if (extraColumn.showCondition && !extraColumn.showCondition(row))
              return null;
            return (
              <ADTCellWrapper
                style={{
                  paddingRight: 0,
                  paddingLeft: index == 0 ? 0 : paddingBetweenExtraColumns ?? 6,
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
