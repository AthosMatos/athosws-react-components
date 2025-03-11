import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import { ADTTR } from "../../styled";
import ADTCellCheckBox from "./ADTCell/ADTCellCheckBox";
import ADTCellExtraCols from "./ADTCell/ADTCellExtraCols";
import ADTCellColumnV2 from "./ADTCellV2";

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const ADTCells = () => {
  const { filteredColumns, extraColumns, pageSize, filteredData, data } = useSelector((state: ADTState) => ({
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
    extraColumns: state.ADTPropsReducer.extraColumns,
    pageSize: state.ADTFilteringReducer.filteredData.length,
    filteredData: state.ADTFilteringReducer.filteredData,
    data: state.ADTPropsReducer.data,
  }));

  console.log("ADTCells");

  return filteredData?.map((row, rowIndex) => (
    <ADTTR
      key={row.uniqueId}
      /*   initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        layout="position"
        transition={{ duration: 0.2 }} */
    >
      <ADTCellCheckBox isLast={rowIndex === pageSize - 1} rowIndex={rowIndex} />
      {filteredColumns.map((column, index) => (
        <ADTCellColumnV2
          value={row[column]}
          /* id={`${column.toString()} - ${row.uniqueId}`}
          key={`${column.toString()} - ${row.uniqueId}`}
          isLast={rowIndex === pageSize - 1}
          column={column}
          index={index}
          row={row}
          rowIndex={rowIndex} */
        />
      ))}
      {/*  <ADTCellColumn
          id={`${column.toString()} - ${row.uniqueId}`}
          key={`${column.toString()} - ${row.uniqueId}`}
          isLast={rowIndex === pageSize - 1}
          column={column}
          index={index}
          row={row}
          rowIndex={rowIndex}
        /> */}
      {extraColumns && <ADTCellExtraCols row={row} />}
    </ADTTR>
  ));
};

export default ADTCells;
