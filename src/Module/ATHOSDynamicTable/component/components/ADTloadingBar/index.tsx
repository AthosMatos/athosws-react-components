import { motion } from "framer-motion";
import { DynamicTableProps } from "../../interfaces";

const duration = 1;
const ADTLoadingBar = ({
  tableName,
  tableStyle,
  loading,
}: {
  tableName: string;
  tableStyle: DynamicTableProps<any>["tableStyle"];
  loading: boolean | string;
}) => {
  return (
    <motion.div
      key={`${tableName}-loading`}
      transition={{
        duration,
      }}
      exit={{
        opacity: 0,
      }}
      className="w-full relative text-black bg-white items-center bg-opacity-15 h-5 flex justify-center p-[0.05rem] rounded-full"
    >
      <motion.div
        initial={{
          width: 0,
        }}
        animate={{
          width: "100%",
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundColor: tableStyle?.highlightColor || "white",
        }}
        className="w-0 h-full rounded-full absolute"
      />
      <p className="z-10 font-light text-sm">{loading || "Carregando..."}</p>
    </motion.div>
  );
};

export default ADTLoadingBar;
