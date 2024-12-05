import { useEffect } from "react";
import { useADTContext } from "../context";
import ADTCells from "../Sections/ADTCells";
import ADTColumns from "../Sections/ADTColumns";
import { ADTBody, ADTHeader, ADTTable } from "../styled";
import { AnimatePresence } from "framer-motion";

export const Tables = ({
  tableWrapperId,
  shouldRenderPersistantTable,
}: {
  tableWrapperId: string;
  shouldRenderPersistantTable: boolean;
}) => {
  const {
    rowHeight,
    props: { autoLockHeight },
  } = useADTContext();
  return (
    <div
      style={autoLockHeight ? { height: rowHeight } : undefined}
      className={`
              
              ${
                shouldRenderPersistantTable &&
                "static overflow-x-auto overflow-y-hidden w-full"
              }`}
      id={tableWrapperId}
    >
      <AnimatePresence>
        {shouldRenderPersistantTable && (
          <PersistantTable tableWrapperId={tableWrapperId} />
        )}
      </AnimatePresence>
      <Table />
    </div>
  );
};

export const Table = () => {
  const {
    tableRef,
    pageState: { moving },
  } = useADTContext();
  return (
    <ADTTable ref={tableRef} animate={{ opacity: moving ? 0 : 1 }}>
      <ADTHeader>
        <ADTColumns />
      </ADTHeader>
      <ADTBody>
        <ADTCells />
      </ADTBody>
    </ADTTable>
  );
};

interface PersistantTableProps {
  tableWrapperId?: string;
}

export const PersistantTable = ({ tableWrapperId }: PersistantTableProps) => {
  const {
    columnsIDs,
    props: { columns, persistPrimaryColumn },
  } = useADTContext();
  const tId = `persistantTable-${tableWrapperId}`;

  useEffect(() => {
    if (!columnsIDs) return;
    const persistantTable = document.getElementById(tId);
    const column = columns[0];
    const DTColDiv = document.getElementById(columnsIDs[column]);

    if (!DTColDiv || !persistantTable) return;

    const observerCallback: ResizeObserverCallback = (
      entries: ResizeObserverEntry[]
    ) => {
      window.requestAnimationFrame((): void | undefined => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        for (let entry of entries) {
          const { width } = entry.contentRect;
          persistantTable.style.width = `${width}px`;
        }
      });
    };
    const resizeObserver = new ResizeObserver(observerCallback);

    resizeObserver.observe(DTColDiv);
    return () => {
      resizeObserver.disconnect();
    };
  }, [columnsIDs]);

  useEffect(() => {
    if (!tableWrapperId) return;
    const tableWrapper = document.getElementById(tableWrapperId);
    const persistantTable = document.getElementById(tId);
    if (!tableWrapper || !persistantTable) return;

    const observerCallback: ResizeObserverCallback = (
      entries: ResizeObserverEntry[]
    ) => {
      window.requestAnimationFrame((): void | undefined => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        for (let entry of entries) {
          const { height, top } = entry.contentRect;
          persistantTable.style.height = `${height}px`;
          //persistantTable.style.top = `${top}px`;
        }
      });
    };
    const resizeObserver = new ResizeObserver(observerCallback);

    resizeObserver.observe(tableWrapper);
    return () => {
      resizeObserver.disconnect();
    };
  }, [tableWrapperId]);

  return (
    <ADTTable
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
