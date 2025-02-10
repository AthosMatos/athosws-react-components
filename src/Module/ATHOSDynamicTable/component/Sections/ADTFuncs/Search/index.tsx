import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { generateColorShades } from "../../../../../utils/color-utils";
import { filterBySearch } from "../../../redux/Filtering/provider";
import { ADTState } from "../../../redux/store";
import { IconWrapper } from "../IconWrapper";

interface SInputProps {
  onChange: (event: any) => void;
  wRef?: any;
}
/* 
${
    openSearch
      ? `w-2/5 max-w-[300px] px-2 focus:bg-gray-100 
  bg-gray-50 border
   border-gray-200 opacity-100`
      : "hidden"
  }
*/
const SInput = ({ onChange, wRef }: SInputProps) => {
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);
  const accentColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.accentColor);

  return (
    <motion.input
      ref={wRef}
      placeholder="Search"
      onChange={onChange}
      whileFocus={{
        backgroundColor: accentColor && generateColorShades(accentColor).dark,
      }}
      style={{
        backgroundColor: accentColor,
        color: textColor,
      }}
      className={`rounded-md outline-none h-9 bg-transparent max-w-[300px] focus:bg-gray-100 bg-gray-50 border
     border-gray-200`}
      initial={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
      animate={{ width: "clamp(100px,66%,300px)", opacity: 1, paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
      exit={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
      transition={{
        duration: 0.53,
        ease: "easeOut",
      }}
    />
  );
};

const ADTSearch = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useDispatch();
  const toggleSearch = () => {
    setOpenSearch(!openSearch);
  };
  const data = useSelector((state: ADTState) => state.ADTPropsReducer.data);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openSearch) {
      inputRef.current?.focus();
    }
  }, [openSearch]);
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);

  return (
    <>
      <AnimatePresence>
        {openSearch && (
          <SInput
            wRef={inputRef}
            onChange={(event) =>
              dispatch(
                filterBySearch({
                  data,
                  searchFilter: event.target.value,
                })
              )
            }
          />
        )}
      </AnimatePresence>
      <IconWrapper open={openSearch} onClick={toggleSearch}>
        <FaSearch className="text-lg" />
      </IconWrapper>
    </>
  );
};

export default memo(ADTSearch);
