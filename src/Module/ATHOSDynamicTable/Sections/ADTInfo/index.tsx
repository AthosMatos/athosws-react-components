import useSelectors_Info from "./useSelectors";

const ADTInfo = () => {
  const { pageSize, tableName, totalItems } = useSelectors_Info();

  return (
    <div className="flex flex-col gap-0">
      <h1 className="text-xl text-gray-600 font-semibold leading-5">{tableName}</h1>
      <p className="text-md text-gray-500 font-light">
        {pageSize} items / {totalItems} total
      </p>
    </div>
  );
};

export default ADTInfo;
