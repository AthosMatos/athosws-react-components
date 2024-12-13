import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdTune } from "react-icons/md";
import { useSelector } from "react-redux";
import { useADTPaging } from "../../redux/Paging/hook";
import { ADTState } from "../../redux/store";
const FuncWrapper = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <motion.div
    layout
    onClick={onClick}
    transition={{ duration: 0.44 }}
    className="transition-all active:scale-100 cursor-pointer hover:scale-95 rounded-md  border border-gray-300 w-9 h-9 flex items-center justify-center"
  >
    {children}
  </motion.div>
);

const ADTFuncs = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const filteredData = useSelector(
    (state: ADTState) => state.ADTFilteredPropsReducer.filteredData
  );
  const props = useSelector((state: ADTState) => state.ADTPropsReducer);
  const { filterBySearch } = useADTPaging();

  const toggleSearch = () => {
    setOpenSearch(!openSearch);
  };
  return (
    <div className="flex mb-4 justify-between sticky left-0 top-0 bg-white z-40">
      <div className="flex flex-col gap-0">
        <h1 className="text-xl font-semibold leading-5">{props.tableName}</h1>
        <p className="text-md text-gray-500 font-light">
          {filteredData?.length} items / {props.data?.length} total
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
          <FuncWrapper onClick={toggleSearch}>
            <FaSearch className="text-lg" />
          </FuncWrapper>
        </div>
      </div>
    </div>
  );
};

export default memo(ADTFuncs);
