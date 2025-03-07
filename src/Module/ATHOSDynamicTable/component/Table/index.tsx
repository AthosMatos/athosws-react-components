import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { useSelector } from "react-redux";
import ADTLoadingBar from "../components/ADTloadingBar";
import { ADTState } from "../redux/store";
import ADTCells from "../Sections/ADTCells";
import ADTColumns from "../Sections/ADTColumns";
import { ADTBody, ADTHeader, ADTTable } from "../styled";

const Table = () => {
  const tableClassName = useSelector((state: ADTState) => state.ADTPropsReducer.className);
  const tableWrapperClassName = useSelector((state: ADTState) => state.ADTPropsReducer.tableWrapperClassName);
  const data = useSelector((state: ADTState) => state.ADTPropsReducer.data);
  const loading = useSelector((state: ADTState) => state.ADTPropsReducer.loading);
  const tableName = useSelector((state: ADTState) => state.ADTPropsReducer.tableName);
  const tableStyle = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle);
  const noDataPlaceholder = useSelector((state: ADTState) => state.ADTPropsReducer.noDataPlaceholder);

  return (
    <AnimatePresence mode="wait">
      {data?.length > 0 ? (
        !loading ? (
          <motion.div
            transition={{
              duration: 1,
            }}
            key={`${tableName}-table`}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="overflow-hidden !min-h-5"
            style={{
              overflowY: "overlay" as any,
            }}
          >
            <div
              className={`rounded-md border p-2  border-gray-300 ${tableWrapperClassName}`}
              style={{
                overflowY: "overlay" as any,
              }}
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
          </motion.div>
        ) : (
          <ADTLoadingBar loading={loading} tableName={tableName} tableStyle={tableStyle} />
        )
      ) : (
        noDataPlaceholder
      )}
    </AnimatePresence>
  );
};

export default memo(Table);
