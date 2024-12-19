import { memo } from "react";
import Search from "./Search";
import Settings from "./Settings";

const ADTFuncs = () => {
  return (
    <div className="flex mb-4 justify-between sticky left-0 top-0 bg-white z-40">
      <Settings />
      <Search />
    </div>
  );
};

export default memo(ADTFuncs);
