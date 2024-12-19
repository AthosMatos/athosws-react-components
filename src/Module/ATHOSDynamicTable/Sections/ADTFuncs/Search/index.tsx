import { memo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdTune } from "react-icons/md";
import { useADTPaging } from "../../../redux/Paging/hook";
import { IconWrapper } from "../IconWrapper";

const Search = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const { filterBySearch } = useADTPaging();

  const toggleSearch = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <div className="flex gap-1 text-gray-400 select-none flex-1 justify-end">
      <IconWrapper>
        <MdTune className="text-2xl" />
      </IconWrapper>
      <input
        onChange={(event) => filterBySearch(event.currentTarget.value)}
        className={`rounded-md outline-none transition-all duration-500 w-0 p-0 h-9 opacity-0
        ${
          openSearch
            ? `w-2/5 max-w-[300px] px-2 focus:bg-gray-100 
        bg-gray-50 border
         border-gray-200 opacity-100`
            : ""
        }`}
      />
      <IconWrapper onClick={toggleSearch}>
        <FaSearch className="text-lg" />
      </IconWrapper>
    </div>
  );
};

export default memo(Search);
