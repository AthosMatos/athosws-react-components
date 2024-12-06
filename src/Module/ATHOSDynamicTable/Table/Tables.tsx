import { AnimatePresence } from "framer-motion";
import { useADTContext } from "../context";
import { PersistantTable, Table } from ".";
import { useEffect } from "react";

const Tables = ({
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

  //simulate expensive operation
  const start = Date.now();
  while (Date.now() - start < 4000) {}

  return (
    <div
      //style={autoLockHeight ? { height: rowHeight } : undefined}
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

export default Tables;
