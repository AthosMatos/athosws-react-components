import { useSelector } from "react-redux";
import { ADTState } from "../redux/store";
import ADTCells from "../Sections/ADTCells";
import ADTColumns from "../Sections/ADTColumns";
import { ADTBody, ADTHeader, ADTTable } from "../styled";

const Table = ({
  tableWrapperId,
  shouldRenderPersistantTable,
}: {
  tableWrapperId: string;
  shouldRenderPersistantTable: boolean;
}) => {
  const { tableClassName } = useSelector(
    (state: ADTState) => state.ADTPropsReducer
  );
  return (
    <div
      id={tableWrapperId}
      className={`${shouldRenderPersistantTable ? "w-full" : ""} `}
    >
      <ADTTable
        className={`rounded-md border border-gray-300 ${tableClassName}`}
      >
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
