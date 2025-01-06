import { memo } from "react";
import ADTInfo from "../ADTInfo";
import ADTConfig from "./Config";
import ADTSearch from "./Search";

const ADTFuncs = () => {
  return (
    <div className="flex mb-4 justify-between sticky left-0 top-0 bg-white z-40 gap-2">
      <ADTInfo />
      <div className="flex gap-1 text-gray-400 select-none flex-1 justify-end">
        <ADTConfig />
        <ADTSearch />
      </div>
    </div>
  );
};

export default memo(ADTFuncs);
