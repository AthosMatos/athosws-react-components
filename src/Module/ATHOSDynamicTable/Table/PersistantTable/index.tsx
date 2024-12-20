import { memo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTCells from "../../Sections/ADTCells";
import ADTColumns from "../../Sections/ADTColumns";
import { ADTBody, ADTHeader, ADTTable } from "../../styled";
import { usePersistantTable } from "./usePersistantTable";

interface PersistantTableProps {
  tableWrapperId?: string;
}

const PersistantTable = ({ tableWrapperId }: PersistantTableProps) => {
  const tId = `persistantTable-${tableWrapperId}`;
  const { persistPrimaryColumn } = useSelector(
    (state: ADTState) => state.ADTPropsReducer
  );

  usePersistantTable({
    tId,
    tableWrapperId,
  });
  return (
    <ADTTable
      //className="mt-2 ml-2"
      backgroundColor={
        persistPrimaryColumn && typeof persistPrimaryColumn !== "boolean"
          ? persistPrimaryColumn.backgroundColor
          : undefined
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      id={tId}
      isPersistant={true}
    >
      <ADTHeader>
        <ADTColumns isPersistPrimaryColumn={true} />
      </ADTHeader>
      <ADTBody>
        <ADTCells isPersistPrimaryColumn={true} />
      </ADTBody>
    </ADTTable>
  );
};

export default memo(PersistantTable);
