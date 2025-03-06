import { Provider } from "react-redux";
import { ATHOSResizableDiv } from "../../ATHOSResizableDiv";
import ADTSelectedRowsToast from "./components/ADTSelectedRowsToast";

import { DynamicTableProps } from "./interfaces";
import ADTHeader from "./Sections/ADTFuncs";
import ADTNav from "./Sections/ADTNav";
import { ADTStatesController } from "./StatesController";
import { ADTTableWrapper } from "./styled";

import { configureStore } from "@reduxjs/toolkit";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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

const duration = 1;

const Comp = ({ props, stly }: { stly?: boolean; props: DynamicTableProps<any> }) => {
  const tableWrapperId = `${props.tableName}-athos-dynamic-table-wrapper`;

  ADTStatesController({ props, tableWrapperId });
  const { selectedRows, data, tableName } = useSelectors_ADTSelectedRowsToast();

  const tableContext = useATHOSDynamicTableContext();
  if (tableContext) {
    useEffect(() => {
      tableContext.setSelectedData({ ...tableContext.selectedData, [tableName]: selectedRows?.map((row) => data[row]) });
    }, [selectedRows, data]);
  }

  const [showTable, setShowTable] = useState(false);
  useEffect(() => {
    if (!props.loading) {
      setTimeout(() => {
        setShowTable(true);
      }, duration * 1000);
    }
  }, [props.loading]);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    scope.current && animate(scope.current, { width: "100%" }, { duration: 1, repeat: Infinity, repeatType: "reverse" });
  }, [scope.current]);
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
          {!props.loading && (
            <>
              <Table tableWrapperId={tableWrapperId} />
              <ADTNav />
            </>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {props.loading && (
            <motion.div
              transition={{
                duration,
              }}
              exit={{
                opacity: 0,
              }}
              className="w-full bg-white bg-opacity-15 h-5 flex justify-center p-[0.05rem] rounded-full"
            >
              <motion.div
                ref={scope}
                style={{
                  backgroundColor: props.tableStyle.highlightColor || "white",
                }}
                className=" w-0 h-full rounded-full"
              />
            </motion.div>
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
