import { ADTTR } from "../../styled";
import ADTCol from "./ADTCol";
import ADTColCheckBox from "./ADTColCheckBox";
import useSelecetor_ADTColumns from "./useSelector";

const ADTColumns = () => {
  const { columns, colsTRId, colH } = useSelecetor_ADTColumns();

  return (
    <ADTTR id={colsTRId} height={colH}>
      <ADTColCheckBox />
      {columns?.map((column: any, index) => (
        <ADTCol index={index} key={`${column}-${index}`} column={column} />
      ))}
    </ADTTR>
  );
};

export default ADTColumns;
