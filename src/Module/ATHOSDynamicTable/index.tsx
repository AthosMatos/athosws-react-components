import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight, FaCog, FaSearch } from "react-icons/fa";
import { ATHOSResizableDiv } from "../ATHOSResizableDiv";
import ADTSelectedRowsToast from "./components/ADTSelectedRowsToast";
import { ADTProvider } from "./context";
import { DynamicTableProps } from "./interfaces";
import { ADTTableWrapper } from "./styled";
import { PersistantTable, Table } from "./Table";
import ADTFuncs from "./Sections/ADTFuncs";
import ADTNav from "./Sections/ADTNav";
import Tables from "./Table/Tables";

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
          className={`gap-5 flex flex-col ${props.className}`}
        >
          <ADTFuncs />

          <Tables
            shouldRenderPersistantTable={shouldRenderPersistantTable}
            tableWrapperId={tableWrapperId}
          />

          <ADTNav />
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
