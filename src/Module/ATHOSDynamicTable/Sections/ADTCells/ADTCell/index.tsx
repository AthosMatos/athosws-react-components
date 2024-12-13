import { Variants } from "framer-motion";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import ADTCheckBox from "../../../components/ADTCheckBox";
import { useADTSelect } from "../../../redux/Select/hook";
import { CheckState } from "../../../redux/Select/interfaces";
import { ADTState } from "../../../redux/store";
import { ADTCellWrapper, ADTTR } from "../../../styled";
import ADTCellColumn from "./ADTCellColumn";

interface ADTCellProps {
  isInit: boolean;
  rowIndex: number;
  row: any;
  isPersistPrimaryColumn?: boolean;
}

const variants: Variants = {
  scaleDown: { scale: 0, opacity: 0 },
  /* initial: { translateY:'100%',
    opacity: 0,
  },
  visible: { translateY: 0,
    opacity: 1,
  }, */
};

const Cell = memo(
  ({
    column,
    index,
    row,
    rowIndex,
  }: {
    column: string;
    index: number;
    row: any;
    rowIndex: number;
  }) => {
    const {
      columns,
      colConfig,
      globalConfig,
      startShort,
      tableStyle,
      paddingBetweenColumns,
      paddingBetweenCells,
    } = useSelector((state: ADTState) => state.ADTPropsReducer);

    const { columnsIDs } = useSelector(
      (state: ADTState) => state.ADTablePropsReducer
    );

    const textColor = useMemo(() => {
      const globalColor = tableStyle?.cellTextColor?.global;
      const specificGlobalColor =
        tableStyle?.cellTextColor?.specific &&
        tableStyle?.cellTextColor?.specific[column]?.global;
      const specificIndexColor =
        tableStyle?.cellTextColor?.specific &&
        tableStyle?.cellTextColor?.specific[column]?.specificIndex &&
        tableStyle?.cellTextColor?.specific[
          column
        ]?.specificIndex?.indexes.includes(rowIndex) &&
        tableStyle?.cellTextColor?.specific[column]?.specificIndex?.color;
      const specificConditionColor =
        tableStyle?.cellTextColor?.specific &&
        tableStyle?.cellTextColor?.specific[column]?.condional?.showCondition(
          row[column]
        ) &&
        tableStyle?.cellTextColor?.specific[column]?.condional?.color;

      return (
        specificConditionColor ||
        specificIndexColor ||
        specificGlobalColor ||
        globalColor
      );
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
  }
);

const ADTCell = memo((props: ADTCellProps) => {
  const { rowIndex, row, isInit, isPersistPrimaryColumn } = props;
  const {
    paddingBetweenCells,
    paddingBetweenColumns,
    tableStyle,
    columns,
    extraColumns,
    paddingBetweenExtraColumns,
  } = useSelector((state: ADTState) => state.ADTPropsReducer);
  const { checkState, selectedRows } = useSelector(
    (state: ADTState) => state.ADTSelectPropsReducer
  );
  const { checkCellClick } = useADTSelect();
  const isCheck = selectedRows.includes(rowIndex);

  const { moving } = useSelector(
    (state: ADTState) => state.ADTFilteredPropsReducer
  );

  return (
    isInit && (
      <ADTTR
        //className="absolute"
        exit={{
          translateX: "100%",
        }}
        initial={{
          translateX: "-100%",
        }}
        animate={{
          translateX: 0,
        }}
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
          .filter((_, index) => !(isPersistPrimaryColumn && index > 0))
          .map((column, index) => (
            <Cell column={column} index={index} row={row} rowIndex={rowIndex} />
          ))}
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
                  {extraColumn.component(row)}
                </ADTCellWrapper>
              );
            })}
      </ADTTR>
    )
  );
});

export default ADTCell;
