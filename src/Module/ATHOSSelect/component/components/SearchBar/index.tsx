import { FaSearch } from "react-icons/fa";
import { ATHOSInput } from "../../../../ATHOSInput/component";
import { ATHOSColors } from "../../../../colors/colors";
import { useATHOSSelectContext } from "../../context";

const SearchBar = () => {
  const {
    props: { search },
    searchValue,
    setSearchValue,
  } = useATHOSSelectContext();

  return (
    <ATHOSInput
      innerPadding={{
        vertical: "0.38rem",
      }}
      value={searchValue}
      icon={<FaSearch />}
      placeholder={search?.placeholder || "Procurar"}
      className={`rounded-lg sticky top-0 z-10 w-full`}
      colors={{
        borderColor: search?.borderColor || "transparent",
        textColor: search?.textColor || ATHOSColors.gray.darker,
        backgroundColor: search?.backgroundColor || "#F6F6F6",
      }}
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
    />
  );
};

export default SearchBar;
