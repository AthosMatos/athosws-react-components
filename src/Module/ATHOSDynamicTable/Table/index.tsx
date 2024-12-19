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
  return (
    <div
      className={`rounded-md border border-gray-300 p-2 ${
        shouldRenderPersistantTable && "w-full"
      }`}
      id={tableWrapperId}
    >
      <ADTTable>
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
