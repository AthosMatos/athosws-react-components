import { AnimatePresence, motion } from "framer-motion";
import { FaCaretDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ADTState } from "../../../../redux/store";

const ColOrderFilter = () => {
  const { showColFilter } = useSelector((state: ADTState) => ({
    showColFilter: state.ADTFilteringReducer.showColOrderFilter,
  }));

  return (
    <AnimatePresence>
      {showColFilter && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
          <FaCaretDown className="text-gray-400" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ColOrderFilter;
