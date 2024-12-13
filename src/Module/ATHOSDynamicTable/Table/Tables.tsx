import { useSelector } from "react-redux";
import { Table } from ".";
import { ADTState } from "../redux/store";

const Tables = ({
  tableWrapperId,
  shouldRenderPersistantTable,
}: {
  tableWrapperId: string;
  shouldRenderPersistantTable: boolean;
}) => {
  const { moving } = useSelector(
    (state: ADTState) => state.ADTFilteredPropsReducer
  );
  /* 
animate={{
        translateX: moving ? "100%" : 0,
      }}
*/
  return (
    <div
      //style={autoLockHeight ? { height: rowHeight } : undefined}
      className={
        //overflow-x-auto overflow-y-hidden
        `
                justify-self-start
                ${shouldRenderPersistantTable && "static w-full"}`
      }
      id={tableWrapperId}
    >
      <Table />
    </div>
  );
};

export default Tables;
