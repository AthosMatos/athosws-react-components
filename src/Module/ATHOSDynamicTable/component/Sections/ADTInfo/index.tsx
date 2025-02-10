import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import useSelectors_Info from "./useSelectors";

const ADTInfo = () => {
  const { pageSize, tableName, totalItems } = useSelectors_Info();
  const textColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.textColor);

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
      <p
        style={{
          color: textColor,
        }}
        className="text-md text-gray-500 font-light"
      >
        {pageSize} items / {totalItems} total
      </p>
    </div>
  );
};

export default ADTInfo;
