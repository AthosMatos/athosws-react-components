import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PersistantTable, Table } from ".";
import { useADTContext } from "../context";
import { ADTState } from "../redux/store";

const Tables = ({
  tableWrapperId,
  shouldRenderPersistantTable,
}: {
  tableWrapperId: string;
  shouldRenderPersistantTable: boolean;
}) => {
  const { rowHeight } = useADTContext();
  const selectedModel = useSelector((state: ADTState) => state.ADTPropsReducer);

  useEffect(() => {
    console.log("selectedModel", selectedModel);
  }, [selectedModel]);

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
