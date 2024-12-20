import { memo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";

const Info = () => {
  const { pageSize } = useSelector((state: ADTState) => state.ADTPagingReducer);
  const { tableName } = useSelector((state: ADTState) => state.ADTPropsReducer);
  const { totalItems } = useSelector(
    (state: ADTState) => state.ADTCustomStatesReducer
  );

  return (
    <div className="flex flex-col gap-0">
      <h1 className="text-xl font-semibold leading-5">{tableName}</h1>
      <p className="text-md text-gray-500 font-light">
        {pageSize} items / {totalItems} total
      </p>
    </div>
  );
};

export default Info;
