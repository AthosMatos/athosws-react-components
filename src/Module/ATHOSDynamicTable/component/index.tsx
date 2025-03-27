import { Provider } from "react-redux";
import { ATHOSResizableDiv } from "../../ATHOSResizableDiv";
import ADTSelectedRowsToast from "./components/ADTSelectedRowsToast";

import { DynamicTableProps } from "./interfaces";
import { ADTStatesController } from "./StatesController";
import { ADTTableWrapper } from "./styled";

import { configureStore } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";
import useSelectors_ADTSelectedRowsToast from "./components/ADTSelectedRowsToast/useSelectors";
import { useATHOSDynamicTableContextPrivate } from "./context";
import ADTCustomStatesReducer from "./redux/CustomStates/provider";
import ADTFilteringReducer from "./redux/Filtering/provider";
import ADTPropsReducer from "./redux/props/provider";
import ADTSelectReducer from "./redux/Select/provider";
import Table from "./Table";
import ADTHeader from "./Table/ADTHeader";
import ADTNav from "./Table/ADTNav";

/**
 *
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */

const Comp = ({ props, stly }: { stly?: boolean; props: DynamicTableProps<any> }) => {
  ADTStatesController({ props });
  const { selectedRows, data, tableName } = useSelectors_ADTSelectedRowsToast();

  const tableContext = useATHOSDynamicTableContextPrivate();
  if (tableContext) {
    useEffect(() => {
      //console.log("selectedRows", selectedRows);
      tableContext.setSelectedData({ ...tableContext.selectedData, [tableName]: selectedRows?.map((row: any) => data[row]) });
    }, [selectedRows]);
  }

  return (
    <ADTTableWrapper
      resizable={!!props.resizeable}
      style={stly ? props.style : undefined}
      className={`${props.wrapperClassName} flex flex-col rounded-md w-full border border-gray-300 m-0`}
    >
      <ADTHeader />
      <Table />
      <ADTNav />
    </ADTTableWrapper>
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
      <ADTSelectedRowsToast />
      {props.resizeable ? (
        <ATHOSResizableDiv
          OuterContainerStyle={{
            maxWidth: "95vw",
          }}
          localSaveName={tableId}
          withToogle
        >
          <Comp props={props} />
        </ATHOSResizableDiv>
      ) : (
        <Comp props={props} stly />
      )}
    </Provider>
  );
}
