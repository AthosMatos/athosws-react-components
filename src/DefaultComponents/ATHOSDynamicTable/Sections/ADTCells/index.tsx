import { useADTContext } from "../../context";
import ADTCell from "./ADTCell";

function ADTCells<T>() {
  const {
    selectMethods: { checkCellClick },
    selectData: { selectedRows, checkState },
    props: { data, colConfig, columns, paddingBetweenRows, minColWidthToShort },
  } = useADTContext<T>();

  return data.map((row, rowIndex) => (
    <ADTCell
      paddingBetweenRows={paddingBetweenRows}
      colConfig={colConfig}
      checkState={checkState}
      isCheck={selectedRows.includes(rowIndex)}
      check={checkCellClick}
      key={rowIndex}
      row={row}
      columns={columns}
      rowIndex={rowIndex}
      minColWidthToShort={minColWidthToShort}
    />
  ));
}

export default ADTCells;
