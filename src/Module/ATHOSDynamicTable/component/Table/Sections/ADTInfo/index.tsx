import { useSelector } from "react-redux";
import { ADTState } from "../../../redux/store";

const ADTInfo = () => {
  const pageSize = useSelector((state: ADTState) => state.ADTFilteringReducer.pageSize);
  const tableName = useSelector((state: ADTState) => state.ADTPropsReducer.tableName);
  const totalItems = useSelector((state: ADTState) => state.ADTCustomStatesReducer.totalItems);
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);
  const loading = useSelector((state: ADTState) => state.ADTPropsReducer.loading);
  const dataLen = useSelector((state: ADTState) => state.ADTPropsReducer.data)?.length;
  return (
    <div className="flex flex-col gap-0">
      <h1
        style={{
          color: textColor,
        }}
        className="text-xl text-gray-600 font-semibold leading-5"
      >
        {tableName}
      </h1>
      {dataLen > 0 && !loading && (
        <p
          style={{
            color: textColor,
          }}
          className="text-md text-gray-500 font-light"
        >
          {pageSize} items / {totalItems} total
        </p>
      )}
    </div>
  );
};

export default ADTInfo;
