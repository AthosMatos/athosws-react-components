import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";
import { ADTTR } from "../../../styled";
import ADTCellCheckBox from "./ADTCellCheckBox";
import ADTCellColumn from "./ADTCellColumn";
import ADTCellExtraCols from "./ADTCellExtraCols";

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const ADTCells = () => {
  const {
    filteredColumns,
    extraCellColumns,
    pageSize,
    filteredData,
    selectedRows,
    selected: selectedColor,
  } = useSelector((state: ADTState) => ({
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
    extraCellColumns: state.ADTPropsReducer.extraCellColumns,
    pageSize: state.ADTFilteringReducer.filteredData.length,
    filteredData: state.ADTFilteringReducer.filteredData,
    selectedRows: state.ADTSelectReducer.selectedRows,
    selected: state.ADTPropsReducer.tableStyle?.selected,
  }));

  return filteredData?.map((row, rowIndex) => (
    <ADTTR
      key={row.uniqueId}
      initial="hidden"
      animate={{
        opacity: 1,
        ...(selectedRows.includes(row.uniqueId) && {
          backgroundColor: selectedColor?.rowColor,
        }),
      }}
      exit="hidden"
      variants={variants}
      layout="position"
      transition={{ duration: 0.2 }}
    >
      <ADTCellCheckBox isLast={rowIndex === pageSize - 1} rowId={row.uniqueId} isCheck={selectedRows.includes(row.uniqueId)} />
      {filteredColumns.map((column, index) => (
        <ADTCellColumn
          hasExtraCols={!!extraCellColumns}
          key={index}
          col={column}
          isCheck={selectedRows.includes(row.uniqueId)}
          isLastRow={rowIndex === pageSize - 1}
          index={index}
          row={row}
          rowIndex={rowIndex}
          isLastCol={index === filteredColumns.length - 1}
        />
      ))}

      {extraCellColumns && <ADTCellExtraCols isCheck={selectedRows.includes(row.uniqueId)} row={row} />}
    </ADTTR>
  ));
};

export default ADTCells;
