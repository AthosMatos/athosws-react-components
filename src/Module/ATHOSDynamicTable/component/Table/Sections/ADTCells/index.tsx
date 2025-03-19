import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";
import { ADTTR } from "../../../styled";
import ADTCellCheckBox from "./ADTCell/ADTCellCheckBox";
import ADTCellColumn from "./ADTCell/ADTCellColumn";
import ADTCellExtraCols from "./ADTCell/ADTCellExtraCols";

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const ADTCells = () => {
  const { filteredColumns, extraCellColumns, pageSize, filteredData, selectedRows, highlightColor } = useSelector((state: ADTState) => ({
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
    extraCellColumns: state.ADTPropsReducer.extraCellColumns,
    pageSize: state.ADTFilteringReducer.filteredData.length,
    filteredData: state.ADTFilteringReducer.filteredData,
    selectedRows: state.ADTSelectReducer.selectedRows,
    highlightColor: state.ADTPropsReducer.tableStyle?.highlightColor,
  }));

  return filteredData?.map((row, rowIndex) => (
    <ADTTR
      key={row.uniqueId}
      initial="hidden"
      animate={{
        opacity: 1,
        ...(selectedRows.includes(row.uniqueId) && {
          backgroundColor: highlightColor,
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

      {extraCellColumns && <ADTCellExtraCols row={row} />}
    </ADTTR>
  ));
};

export default ADTCells;
