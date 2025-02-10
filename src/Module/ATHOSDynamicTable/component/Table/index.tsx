import { useSelector } from "react-redux";
import { ADTState } from "../redux/store";
import ADTCells from "../Sections/ADTCells";
import ADTColumns from "../Sections/ADTColumns";
import { ADTBody, ADTHeader, ADTTable } from "../styled";

const Table = ({ tableWrapperId }: { tableWrapperId: string }) => {
  const tableClassName = useSelector((state: ADTState) => state.ADTPropsReducer.tableClassName);
  const tableWrapperClassName = useSelector((state: ADTState) => state.ADTPropsReducer.tableWrapperClassName);

  return (
    <div
      className={`rounded-md border p-2  border-gray-300 ${tableWrapperClassName}`}
      style={{
        overflowY: "overlay" as any,
      }}
      id={tableWrapperId}
    >
      <ADTTable className={tableClassName}>
        <ADTHeader>
          <ADTColumns />
        </ADTHeader>
        <ADTBody>
          <ADTCells />
        </ADTBody>
      </ADTTable>
    </div>
  );
};

export default Table;
