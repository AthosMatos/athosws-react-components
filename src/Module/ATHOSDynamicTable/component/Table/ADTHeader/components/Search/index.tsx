import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterBySearch } from "../../../../redux/Filtering/provider";
import { ADTState } from "../../../../redux/store";
import { IconWrapper } from "../../styledWrappers";

interface SInputProps {
  onChange: (event: any) => void;
  wRef?: any;
}
/* 
${
    openSearch
      ? `w-2/5 max-w-[300px] px-2 focus:bg-snow 
  bg-zinc-50 border
   border-zinc-200 opacity-100`
      : "hidden"
  }
*/
const SInput = ({ onChange, wRef }: SInputProps) => {
  return (
    <motion.input
      ref={wRef}
      placeholder="Search"
      onChange={onChange}
      className={`rounded-md transition-colors outline-none h-9 max-w-[300px] 
        bg-transparent 
        focus:bg-zinc-200 dark:focus:bg-zinc-800
         border
        border-zinc-200 dark:border-zinc-600 focus:border-zinc-300`}
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

export const ADTSearch = memo(() => {
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
        <FaSearch className="text-base" />
      </IconWrapper>
    </>
  );
});
