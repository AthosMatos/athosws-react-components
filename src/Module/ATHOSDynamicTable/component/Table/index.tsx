import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { useSelector } from "react-redux";
import ADTLoadingBar from "../components/ADTloadingBar";
import { ADTState } from "../redux/store";
import { ADTBody, ADTHeader, ADTTable } from "../styled";
import ADTCells from "./Sections/ADTCells";
import ADTColumns from "./Sections/ADTColumns";

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
            className={`!min-h-5  ${tableWrapperClassName}`}
            style={{
              overflowY: "overlay" as any,
            }}
          >
            <ADTTable className={`w-full ${tableClassName}`}>
              <ADTHeader>
                <ADTColumns />
              </ADTHeader>
              <ADTBody>
                <ADTCells />
              </ADTBody>
            </ADTTable>
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
