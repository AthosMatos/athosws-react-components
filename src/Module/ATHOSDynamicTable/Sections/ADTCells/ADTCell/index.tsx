import { memo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";
import { ADTTR } from "../../../styled";
import ADTCellCheckBox from "./ADTCellCheckBox";
import ADTCellColumn from "./ADTCellColumn";
import { transition } from "./ADTCellExitWrapper";
import ADTCellExtraCols from "./ADTCellExtraCols";

interface ADTCellProps {
  rowIndex: number;
  row: any;
  isPersistPrimaryColumn?: boolean;
}

const ADTCell = (props: ADTCellProps) => {
  const { rowIndex, row, isPersistPrimaryColumn } = props;
  const { columns, extraColumns } = useSelector(
    (state: ADTState) => state.ADTPropsReducer
  );
  const { pageSize } = useSelector((state: ADTState) => state.ADTPagingReducer);
  const isLast = pageSize && rowIndex === pageSize - 1;

  return (
    <ADTTR layout="preserve-aspect" transition={transition}>
      <ADTCellCheckBox isLast={isLast} rowIndex={rowIndex} />
      {(columns as any[]).map((column, index) => (
        <ADTCellColumn
          key={column[row]}
          isLast={isLast}
          column={column}
          index={index}
          row={row}
          rowIndex={rowIndex}
        />
      ))}

      {extraColumns && (
        <ADTCellExtraCols
          isPersistPrimaryColumn={isPersistPrimaryColumn}
          row={row}
        />
      )}
    </ADTTR>
  );
};

export default memo(ADTCell);
