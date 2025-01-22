import { memo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTInfo from "../ADTInfo";
import ADTConfig from "./Config";
import ADTSearch from "./Search";

const ADTFuncs = () => {
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);

  return (
    <div className="flex mb-4 justify-between gap-2">
      <ADTInfo />
      <div
        style={{
          color: textColor,
        }}
        className="flex gap-1 text-gray-400 select-none flex-1 justify-end"
      >
        <ADTConfig />
        <ADTSearch />
      </div>
    </div>
  );
};

export default memo(ADTFuncs);
