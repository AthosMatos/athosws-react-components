import { memo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";

const Settings = () => {
  const filteredData = useSelector(
    (state: ADTState) => state.ADTFilteredPropsReducer.filteredData
  );
  const { tableName, data } = useSelector(
    (state: ADTState) => state.ADTPropsReducer
  );
  return (
    <div className="flex flex-col gap-0">
      <h1 className="text-xl font-semibold leading-5">{tableName}</h1>
      <p className="text-md text-gray-500 font-light">
        {filteredData?.length} items / {data?.length} total
      </p>
    </div>
  );
};

export default memo(Settings);
