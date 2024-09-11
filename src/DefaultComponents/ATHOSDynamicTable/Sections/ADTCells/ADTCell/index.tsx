import { v4 } from "uuid";
import ADTCheckBox from "../../../components/ADTCheckBox";
import { useADTContext } from "../../../context";
import { CheckState } from "../../../hooks/useADTSelectedData";
import { ADTCellWrapper, ADTTR } from "../../../styled";
import ADTCellColumn from "./ADTCellColumn";

function ADTCell<T>({ row, rowIndex }: { row: any; rowIndex: number }) {
  const divID = v4().toString();
  const {
    selectMethods: { checkCellClick },
    selectData: { selectedRows, checkState },
    props: { columns, paddingBetweenCells, paddingBetweenColumns },
  } = useADTContext<T>();

  const isCheck = selectedRows.includes(rowIndex);
  return (
    <ADTTR id={divID}>
      <ADTCellWrapper
        vertPad={paddingBetweenCells && paddingBetweenCells / 2}
        paddingHorizontal={paddingBetweenColumns}
      >
        <ADTCheckBox
          checked={
            checkState === CheckState.PAGE && isCheck ? checkState : isCheck
          }
          check={() => checkCellClick(rowIndex)}
        />
      </ADTCellWrapper>
      {(columns as any[]).map((column: string) => (
        <ADTCellWrapper
          paddingHorizontal={paddingBetweenColumns}
          vertPad={paddingBetweenCells && paddingBetweenCells / 2}
          bRightLeft
          key={column as string}
        >
          <ADTCellColumn row={row} column={column} />
        </ADTCellWrapper>
      ))}
    </ADTTR>
  );
}

export default ADTCell;
