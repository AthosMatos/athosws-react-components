import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import { ADTTR } from "../../styled";
import ADTCol from "./ADTCol";
import ADTColCheckBox from "./ADTColCheckBox";
import ADTColExtraCellCols from "./ADTColExtraCellCols";

const ADTColumns = () => {
  const { filteredColumns } = useSelector((state: ADTState) => ({
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
  }));

  return (
    <ADTTR>
      <ADTColCheckBox />
      {filteredColumns?.map((column, index) => (
        <ADTCol index={index} key={column} column={column} />
      ))}
      <ADTColExtraCellCols index={filteredColumns?.length === 0 ? 0 : 1} />
    </ADTTR>
  );
};

export default ADTColumns;
