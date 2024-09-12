import { memo } from "react";
import ADTCheckBox from "../../../components/ADTCheckBox";
import { CheckState } from "../../../hooks/useADTSelectedData";
import { ColConfig, ExtraColumnsI, GlobalConfig } from "../../../interfaces";
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
            paddingHorizontal={paddingBetweenColumns}
            vertPad={paddingBetweenCells && paddingBetweenCells / 2}
            bRightLeft
            key={index}
          >
            <ADTCellColumn
              row={row}
              column={column}
              colConfig={colConfig}
              globalConfig={globalConfig}
            />
          </ADTCellWrapper>
        ))}
        {extraColumns &&
          extraColumns.map((extraColumn, index) => {
            if (extraColumn.showCondition && !extraColumn.showCondition(row))
              return null;
            return (
              <ADTCellWrapper
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
