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
  const { filteredColumns, extraColumns, pageSize, filteredData } = useSelector((state: ADTState) => ({
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
    extraColumns: state.ADTPropsReducer.extraColumns,
    pageSize: state.ADTFilteringReducer.filteredData.length,
    filteredData: state.ADTFilteringReducer.filteredData,
  }));

  return filteredData?.map((row, rowIndex) => (
    <ADTTR
      key={row.uniqueId}
      /* initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      layout="position"
      transition={{ duration: 0.2 }} */
    >
      <ADTCellCheckBox isLast={rowIndex === pageSize - 1} rowIndex={rowIndex} />
      {filteredColumns.map((column, index) => (
        <ADTCellColumn
          id={`${column.toString()} - ${row.uniqueId}`}
          key={`${column.toString()} - ${row.uniqueId}`}
          isLast={rowIndex === pageSize - 1}
          column={column}
          index={index}
          row={row}
          rowIndex={rowIndex}
        />
      ))}

      {extraColumns && <ADTCellExtraCols row={row} />}
    </ADTTR>
  ));
};

export default ADTCells;
