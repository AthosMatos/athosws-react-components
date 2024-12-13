import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ATHOSResizableDiv } from "../ATHOSResizableDiv";
import ADTSelectedRowsToast from "./components/ADTSelectedRowsToast";

import { ADTController } from "./Controller";
import { DynamicTableProps } from "./interfaces";
import { ADTStore } from "./redux/store";
import ADTFuncs from "./Sections/ADTFuncs";
import ADTNav from "./Sections/ADTNav";
import { ADTTableWrapper } from "./styled";
import { PersistantTable } from "./Table";
import Tables from "./Table/Tables";

function hasScroll(element: HTMLElement) {
  return element.scrollWidth > element.clientWidth;
}

/**
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */

const Comp = ({
  props,
  stly,
}: {
  stly?: boolean;
  props: DynamicTableProps<any>;
}) => {
  const tableWrapperId = `${props.tableName}-athos-dynamic-table-wrapper`;

  const [shouldRenderPersistantTable, setShouldRenderPersistantTable] =
    useState(false);

  useEffect(() => {
    if (!props.persistPrimaryColumn) return;
    const tableWrapper = document.getElementById(tableWrapperId);

    if (!tableWrapper) return;

    const observerCallback: ResizeObserverCallback = (
      entries: ResizeObserverEntry[]
    ) => {
      window.requestAnimationFrame((): void | undefined => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        if (tableWrapper && hasScroll(tableWrapper)) {
          setShouldRenderPersistantTable(true);
        } else {
          setShouldRenderPersistantTable(false);
        }
      });
    };
    const resizeObserver = new ResizeObserver(observerCallback);

    resizeObserver.observe(tableWrapper);
    return () => {
      resizeObserver.disconnect();
    };
  }, [tableWrapperId]);

  ADTController({ props });

  return (
    <>
      <ADTSelectedRowsToast />
      <ADTTableWrapper
        resizable={!!props.resizeable}
        style={stly ? props.style : undefined}
        className={` flex flex-col  ${!props.resizeable && props.className}`}
      >
        <ADTFuncs />
        <div className="sticky left-0 z-30">
          {shouldRenderPersistantTable && (
            <AnimatePresence>
              <PersistantTable tableWrapperId={tableWrapperId} />
            </AnimatePresence>
          )}
        </div>
        <Tables
          shouldRenderPersistantTable={shouldRenderPersistantTable}
          tableWrapperId={tableWrapperId}
        />

        <ADTNav />
      </ADTTableWrapper>
    </>
  );
};

export function ATHOSDynamicTable<T>(props: DynamicTableProps<T>) {
  const tableId = `${props.tableName}-athos-dynamic-table`;

  return (
    <Provider store={ADTStore}>
      {props.resizeable ? (
        <ATHOSResizableDiv
          saveInLocalStorage={tableId}
          withToogle
          style={props.style}
          className={`${props.className}`}
        >
          <Comp props={props} />
        </ATHOSResizableDiv>
      ) : (
        <Comp props={props} stly />
      )}
    </Provider>
  );
}
