import { FaCog, FaSearch } from "react-icons/fa";
import { useADTContext } from "../../context";
import { MdTune } from "react-icons/md";
import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const FuncWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    layout
    transition={{ duration: 0.44 }}
    className="transition-all active:scale-100 cursor-pointer hover:scale-95 rounded-md  border border-gray-300 w-9 h-9 flex items-center justify-center"
  >
    {children}
  </motion.div>
);

const ADTFuncs = () => {
  const {
    props,
    pageState: { filterBySearch },
  } = useADTContext();
  const [openSearch, setOpenSearch] = useState(false);

  const toggleSearch = () => {
    setOpenSearch(!openSearch);
  };
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-0">
        <h1 className="text-xl font-semibold leading-5">{props.tableName}</h1>
        <p className="text-md text-gray-500 font-light">
          {props.data.length} items / {props.originalData.length} total
        </p>
      </div>
      <div className="flex gap-2 text-gray-400 select-none">
        <FuncWrapper>
          <MdTune className="text-2xl" />
        </FuncWrapper>
        <div className="flex gap-2">
          <AnimatePresence>
            {openSearch && (
              <motion.input
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault(); // Prevent default Enter behavior if needed
                    filterBySearch(event.currentTarget.value);
                  }
                }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.44 }}
                className="focus:bg-gray-100 bg-gray-50 h-9 border border-gray-200 rounded-md outline-none px-2"
              />
            )}
          </AnimatePresence>
          <FuncWrapper>
            <FaSearch onClick={toggleSearch} className="text-lg" />
          </FuncWrapper>
        </div>
      </div>
    </div>
  );
};

export default memo(ADTFuncs);
