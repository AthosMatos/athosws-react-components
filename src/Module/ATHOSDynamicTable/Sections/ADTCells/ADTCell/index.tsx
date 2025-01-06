import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";
import { ADTTR } from "../../../styled";
import ADTCellCheckBox from "./ADTCellCheckBox";
import ADTCellColumn from "./ADTCellColumn";
import ADTCellExtraCols from "./ADTCellExtraCols";

interface ADTCellProps {
  rowIndex: number;
  row: any;
}

const variants = {
  initial: {
    opacity: 0,
  },
  animate: { opacity: 1, transition: { duration: 0.43 } },
};
const ADTCell = (props: ADTCellProps) => {
  const { rowIndex, row } = props;
  const { filteredColumns, extraColumns, pageSize } = useSelector((state: ADTState) => ({
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
    extraColumns: state.ADTPropsReducer.extraColumns,
    pageSize: state.ADTFilteringReducer.pageSize,
  }));

  const isLast = useMemo(() => rowIndex === pageSize - 1, [rowIndex, pageSize]);

  return (
    <ADTTR layout="preserve-aspect" initial="initial" animate="animate" exit="exit" variants={variants} transition={{ duration: 0.1 }}>
      <ADTCellCheckBox isLast={isLast} rowIndex={rowIndex} />
      {filteredColumns.map((column, index) => (
        <ADTCellColumn key={row[column]} isLast={isLast} column={column} index={index} row={row} rowIndex={rowIndex} />
      ))}

      {extraColumns && <ADTCellExtraCols row={row} />}
    </ADTTR>
  );
};

export default memo(ADTCell);
