import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ADTState } from "../redux/store";
import ADTCells from "../Sections/ADTCells";
import ADTColumns from "../Sections/ADTColumns";
import { ADTBody, ADTHeader, ADTTable } from "../styled";
const Table = ({ tableWrapperId }: { tableWrapperId: string }) => {
  const tableClassName = useSelector((state: ADTState) => state.ADTPropsReducer.className);
  const tableWrapperClassName = useSelector((state: ADTState) => state.ADTPropsReducer.tableWrapperClassName);

  return (
    <motion.div
      transition={{
        duration: 1,
      }}
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
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
    </motion.div>
  );
};

export default Table;
