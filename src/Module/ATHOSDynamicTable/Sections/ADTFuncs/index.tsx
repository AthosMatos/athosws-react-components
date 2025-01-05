import { memo } from "react";
import { FaFilter } from "react-icons/fa";
import ADTConfig from "./Config";
import { IconWrapper } from "./IconWrapper";
import ADTInfo from "./Info";
import ADTSearch from "./Search";

const ADTFuncs = () => {
  return (
    <div className="flex mb-4 justify-between sticky left-0 top-0 bg-white z-40 gap-2">
      <ADTInfo />
      <div className="flex gap-1 text-gray-400 select-none flex-1 justify-end">
        <IconWrapper open onClick={() => {}}>
          <FaFilter className="text-lg" />
        </IconWrapper>
        <ADTConfig />
        <ADTSearch />
      </div>
    </div>
  );
};

export default memo(ADTFuncs);
