import { memo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";
import ADTInfo from "./components/ADTInfo";
import ADTConfig from "./components/Config";
import { ADTSearch } from "./components/Search";

const ADTHeader = () => {
  const loading = useSelector((state: ADTState) => state.ADTPropsReducer.loading);
  const dataLen = useSelector((state: ADTState) => state.ADTPropsReducer.data)?.length;
  return (
    <div className="flex mb-4 justify-between gap-2">
      <ADTInfo />
      {dataLen > 0 && !loading && (
        <div className="flex gap-1 text-gray-400 select-none flex-1 justify-end">
          <ADTConfig />
          <ADTSearch />
        </div>
      )}
    </div>
  );
};

export default memo(ADTHeader);
