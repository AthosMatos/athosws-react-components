import { Provider } from "react-redux";
import { ATHOSResizableDiv } from "../../ATHOSResizableDiv";
import ADTSelectedRowsToast from "./components/ADTSelectedRowsToast";

import { DynamicTableProps } from "./interfaces";
import ADTHeader from "./Sections/ADTHeader";
import ADTNav from "./Sections/ADTNav";
import { ADTStatesController } from "./StatesController";
import { ADTTableWrapper } from "./styled";

import { configureStore } from "@reduxjs/toolkit";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import ADTLoadingBar from "./components/ADTloadingBar";
import useSelectors_ADTSelectedRowsToast from "./components/ADTSelectedRowsToast/useSelectors";
import { useATHOSDynamicTableContext } from "./context";
import ADTCustomStatesReducer from "./redux/CustomStates/provider";
import ADTFilteringReducer from "./redux/Filtering/provider";
import ADTPropsReducer from "./redux/props/provider";
import ADTSelectReducer from "./redux/Select/provider";
import Table from "./Table";
/**
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */

const Comp = ({ props, stly }: { stly?: boolean; props: DynamicTableProps<any> }) => {
  ADTStatesController({ props });
  const { selectedRows, data, tableName } = useSelectors_ADTSelectedRowsToast();

  const tableContext = useATHOSDynamicTableContext();
  if (tableContext) {
    useEffect(() => {
      tableContext.setSelectedData({ ...tableContext.selectedData, [tableName]: selectedRows?.map((row) => data[row]) });
    }, [selectedRows, data]);
  }

  return (
    <>
      <ADTSelectedRowsToast />
      <ADTTableWrapper
        resizable={!!props.resizeable}
        style={stly ? props.style : undefined}
        className={`${props.wrapperClassName} flex flex-col rounded-md w-full border border-gray-300 m-0`}
      >
        <ADTHeader />
        <AnimatePresence mode="wait">
          {props.data.length !== 0 ? (
            !props.loading ? (
              <motion.div
                transition={{
                  duration: 1,
                }}
                key={`${props.tableName}-table`}
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                className="overflow-hidden !min-h-5"
                style={{
                  overflowY: "overlay" as any,
                }}
              >
                <Table />
                <ADTNav />
              </motion.div>
            ) : (
              <ADTLoadingBar loading={props.loading} tableName={props.tableName} tableStyle={props.tableStyle} />
            )
          ) : (
            props.noDataPlaceholder
          )}
        </AnimatePresence>
      </ADTTableWrapper>
    </>
  );
};

export function ATHOSDynamicTable<T>(props: DynamicTableProps<T>) {
  const tableId = `${props.tableName}-athos-dynamic-table`;
  const store = useMemo(
    () =>
      configureStore({
        reducer: {
          ADTPropsReducer,
          ADTCustomStatesReducer,
          ADTSelectReducer,
          ADTFilteringReducer,
        },
      }),
    []
  );
  return (
    <Provider store={store}>
      {props.resizeable ? (
        <ATHOSResizableDiv saveInLocalStorage={tableId} withToogle>
          <Comp props={props} />
        </ATHOSResizableDiv>
      ) : (
        <Comp props={props} stly />
      )}
    </Provider>
  );
}
