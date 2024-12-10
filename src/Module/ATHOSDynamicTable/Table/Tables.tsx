import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Table } from ".";
import { useADTContext } from "../context";
import { ADTState } from "../redux/store";

const Tables = ({
  tableWrapperId,
  shouldRenderPersistantTable,
}: {
  tableWrapperId: string;
  shouldRenderPersistantTable: boolean;
}) => {
  const selectedModel = useSelector((state: ADTState) => state.ADTPropsReducer);
  const {
    pageState: { moving },
  } = useADTContext();

  return (
    <motion.div
      animate={{ opacity: moving ? 0 : 1 }}
      //style={autoLockHeight ? { height: rowHeight } : undefined}
      className={
        //overflow-x-auto overflow-y-hidden
        `
                justify-self-start
                ${shouldRenderPersistantTable && "static w-full"}`
      }
      id={tableWrapperId}
    >
      <Table />
    </motion.div>
  );
};

export default Tables;
