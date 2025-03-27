import { useSelector } from "react-redux";
import { ADTState } from "../../../../redux/store";

const ADTInfo = () => {
  const pageSize = useSelector((state: ADTState) => state.ADTFilteringReducer.pageSize);
  const tableName = useSelector((state: ADTState) => state.ADTPropsReducer.tableName);
  const totalItems = useSelector((state: ADTState) => state.ADTCustomStatesReducer.totalItems);
  const loading = useSelector((state: ADTState) => state.ADTPropsReducer.loading);
  const dataLen = useSelector((state: ADTState) => state.ADTPropsReducer.data)?.length;

  const headerTitleColor = undefined;
  const headerSubTitleColor = undefined;
  return (
    <div className="flex flex-col gap-0">
      <h1 style={{ color: headerTitleColor }} className="text-xl text-zinc-800 dark:text-zinc-200 font-semibold leading-5">
        {tableName}
      </h1>
      {dataLen > 0 && !loading && (
        <p style={{ color: headerSubTitleColor }} className="text-md text-zinc-500 dark:text-zinc-400 font-light">
          {pageSize} items / {totalItems} total
        </p>
      )}
    </div>
  );
};

export default ADTInfo;
