import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../../../../../redux/store";

interface ADTCellColumnProps {
  column: string;
}

export const useColumnResizeHandler = ({ column }: ADTCellColumnProps) => {
  const colConfig = useSelector((state: ADTState) => state.ADTPropsReducer.colConfig);
  const globalConfig = useSelector((state: ADTState) => state.ADTPropsReducer.globalConfig);
  const tableName = useSelector((state: ADTState) => state.ADTPropsReducer.tableName);
  const minColWidthToShort = (colConfig && colConfig[column]?.minColWidthToShort) || globalConfig?.minColWidthToShort;
  const [short, setShort] = useState<boolean>();

  useEffect(() => {
    if (!minColWidthToShort) return;
    const DTColDiv = document.getElementById(`${tableName}-${column}-th`);
    /* console.log(DTColDiv); */
    if ((colConfig && colConfig[column]?.cellComponent) || !minColWidthToShort || !DTColDiv) return;

    // Callback function to execute when resize is observed
    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      const width = entry.contentRect.width;
      console.log(column, width);
      if (width < minColWidthToShort) {
        !short && setShort(true);
      } else {
        short && setShort(false);
      }
    };

    // Create a ResizeObserver instance
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(DTColDiv);

    // Cleanup observer on component unmount
    return () => {
      resizeObserver.unobserve(DTColDiv);
      resizeObserver.disconnect();
    };
  }, [minColWidthToShort]);

  return { short };
};
