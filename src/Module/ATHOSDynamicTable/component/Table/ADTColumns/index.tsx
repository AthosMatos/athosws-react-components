import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import { ADTTR } from "../../styled";
import ADTCol from "./ADTCol";
import ADTColCheckBox from "./ADTColCheckBox";

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
    </ADTTR>
  );
};

export default ADTColumns;
