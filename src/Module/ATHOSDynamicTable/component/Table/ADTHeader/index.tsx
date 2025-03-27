import { memo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTInfo from "./components/ADTInfo";
import ADTColumnsFilter from "./components/ColumnsFilter";
import { ADTSearch } from "./components/Search";
import ADTSelectedFuncs from "./components/SelectedFuncs";

const ADTHeader = () => {
  const loading = useSelector((state: ADTState) => state.ADTPropsReducer.loading);
  const dataLen = useSelector((state: ADTState) => state.ADTPropsReducer.data)?.length;

  return (
    <div className="flex mb-4 justify-between gap-2">
      <ADTInfo />
      {dataLen > 0 && !loading && (
        <div className="flex gap-1 text-zinc-400 select-none flex-1 justify-end">
          <ADTSelectedFuncs />
          <ADTColumnsFilter />
          <ADTSearch />
        </div>
      )}
    </div>
  );
};

export default memo(ADTHeader);
