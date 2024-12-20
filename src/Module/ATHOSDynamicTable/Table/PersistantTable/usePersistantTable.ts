import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";

export const usePersistantTable = ({
  tableWrapperId,
  tId,
}: {
  tableWrapperId?: string;
  tId: string;
}) => {
  const { columns } = useSelector((state: ADTState) => state.ADTPropsReducer);
  const { columnsIDs } = useSelector(
    (state: ADTState) => state.ADTCustomStatesReducer
  );

  useEffect(() => {
    if (!columnsIDs) return;
    const persistantTable = document.getElementById(tId);
    const column = columns[0];
    const DTColDiv = document.getElementById(columnsIDs[column]);

    if (!DTColDiv || !persistantTable) return;

    const observerCallback: ResizeObserverCallback = (
      entries: ResizeObserverEntry[]
    ) => {
      window.requestAnimationFrame((): void | undefined => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        for (let entry of entries) {
          const { width } = entry.contentRect;
          persistantTable.style.width = `${width}px`;
        }
      });
    };
    const resizeObserver = new ResizeObserver(observerCallback);

    resizeObserver.observe(DTColDiv);
    return () => {
      resizeObserver.disconnect();
    };
  }, [columnsIDs]);

  useEffect(() => {
    if (!tableWrapperId) return;
    const tableWrapper = document.getElementById(tableWrapperId);
    console.log("tableWrapper", tableWrapper);
    const persistantTable = document.getElementById(tId);
    if (!tableWrapper || !persistantTable) return;

    const observerCallback: ResizeObserverCallback = (
      entries: ResizeObserverEntry[]
    ) => {
      window.requestAnimationFrame((): void | undefined => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        for (let entry of entries) {
          const { height, top } = entry.contentRect;
          persistantTable.style.height = `${height}px`;
          //persistantTable.style.top = `${top}px`;
        }
      });
    };
    const resizeObserver = new ResizeObserver(observerCallback);

    resizeObserver.observe(tableWrapper);
    return () => {
      resizeObserver.disconnect();
    };
  }, [tableWrapperId]);
};
