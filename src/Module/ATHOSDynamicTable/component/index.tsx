import { Provider } from "react-redux";
import { ATHOSResizableDiv } from "../../ATHOSResizableDiv";
import ADTSelectedRowsToast from "./components/ADTSelectedRowsToast";

import { DynamicTableProps } from "./interfaces";
import ADTFuncs from "./Sections/ADTFuncs";
import ADTNav from "./Sections/ADTNav";
import { ADTStatesController } from "./StatesController";
import { ADTTableWrapper } from "./styled";

import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
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
  const tableWrapperId = `${props.tableName}-athos-dynamic-table-wrapper`;

  ADTStatesController({ props, tableWrapperId });

  return (
    <>
      <ADTSelectedRowsToast />
      <ADTTableWrapper
        resizable={!!props.resizeable}
        style={stly ? props.style : undefined}
        className={`${props.wrapperClassName} flex flex-col rounded-md w-full border border-gray-300 m-0`}
      >
        <ADTFuncs />
        <Table tableWrapperId={tableWrapperId} />

        <ADTNav />
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
