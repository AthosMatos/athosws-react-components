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
      className={`h-full ${shouldRenderPersistantTable && "w-full"}`}
      id={tableWrapperId}
    >
      <ADTTable className="rounded-md border border-gray-300 ">
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
