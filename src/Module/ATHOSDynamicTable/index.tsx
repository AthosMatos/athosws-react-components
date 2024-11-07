import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight, FaCog, FaSearch } from "react-icons/fa";
import { ATHOSResizableDiv } from "../ATHOSResizableDiv";
import ADTSelectedRowsToast from "./components/ADTSelectedRowsToast";
import { ADTProvider } from "./context";
import { DynamicTableProps } from "./interfaces";
import { ADTTableWrapper } from "./styled";
import { PersistantTable, Table } from "./Table";

function hasScroll(element: HTMLElement) {
  return element.scrollWidth > element.clientWidth;
}

/**
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */
export function ATHOSDynamicTable<T>(props: DynamicTableProps<T>) {
  const tableId = `${props.tableName}-athos-dynamic-table`;
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

  const Comp = (stly?: boolean) => {
    return (
      <ADTProvider props={props}>
        <ADTSelectedRowsToast />
        <ADTTableWrapper
          resizable={props.resizeable}
          style={stly ? props.style : undefined}
          className="gap-5 flex flex-col"
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-0">
              <h1 className="text-xl font-semibold leading-5">
                {props.tableName}
              </h1>
              <p className="text-md text-gray-500 font-light">
                {props.data.length} items
              </p>
            </div>
            <div className="flex gap-2 text-gray-400 select-none">
              <div className="transition-all active:scale-100 cursor-pointer hover:scale-95 rounded-md  border border-gray-300 w-9 h-9 flex items-center justify-center">
                <FaCog />
              </div>
              <div className="transition-all active:scale-100 cursor-pointer hover:scale-95 rounded-md border border-gray-300 w-9 h-9 flex items-center justify-center">
                <FaSearch />
              </div>
            </div>
          </div>

          <div
            className={`${
              shouldRenderPersistantTable &&
              "static overflow-x-auto overflow-y-hidden w-full"
            }`}
            id={tableWrapperId}
          >
            <AnimatePresence>
              {shouldRenderPersistantTable && (
                <PersistantTable tableWrapperId={tableWrapperId} />
              )}
            </AnimatePresence>
            <Table />
          </div>
          <div className="flex self-end flex-col items-center">
            <div className="flex gap-2 text-gray-400 rounded-lg select-none border border-gray-300 rounded-t-md items-center">
              <div className="transition-all active:scale-100 cursor-pointer hover:scale-95 rounded-md border bg-gray-200 w-7 h-9 flex items-center justify-center">
                <FaCaretLeft />
              </div>
              <p className="w-fit h-fit">1</p>
              <div className="transition-all active:scale-100 cursor-pointer hover:scale-95 rounded-md border bg-gray-200 w-7 h-9 flex items-center justify-center">
                <FaCaretRight />
              </div>
            </div>
            1 2 3 4 5
          </div>
        </ADTTableWrapper>
      </ADTProvider>
    );
  };

  if (props.resizeable) {
    return (
      <ATHOSResizableDiv
        saveInLocalStorage={tableId}
        withToogle
        style={props.style}
      >
        {Comp()}
      </ATHOSResizableDiv>
    );
  } else {
    return Comp(true);
  }
}
