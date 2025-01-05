import { useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { ADTState } from "../../../../redux/store";

type TableType = {
  [key: string]: {
    colWidths: { [key: string]: number };
  };
};
const ComponentName = "AthosDynamicTable";

export const useADTBorder = (colID: string) => {
  const paddingBetweenColumns = useSelector((state: ADTState) => state.ADTPropsReducer.spacingBetweenColumns);
  const tableName = useSelector((state: ADTState) => state.ADTPropsReducer.tableName);

  const wrapperid = v4();

  //const [doubleClicked, setDoubleClicked] = useState(false);

  const getSavedWidths = () => {
    const ComponentData = localStorage.getItem(ComponentName);
    if (ComponentData) {
      const parsedTD = JSON.parse(ComponentData) as TableType;
      return parsedTD[tableName].colWidths;
    }
    return null;
  };

  const saveWidths = () => {};

  useEffect(() => {
    const BRDWrapperDiv = document.getElementById(wrapperid);
    const ColDivs = document.querySelectorAll(`[id="${colID}"]`);

    if (!BRDWrapperDiv || !ColDivs.length) return;

    const handleMove = (pageX: number) => {
      const BRDWrapperDivRect = BRDWrapperDiv.getBoundingClientRect();
      const ColDivRect = ColDivs[0].getBoundingClientRect();
      const ColDivWidth = ColDivRect.width;
      const Plus = Math.round(pageX - (BRDWrapperDivRect.right - 4)); //-4 to centralize in the cursor
      const newWidth = ColDivWidth + Plus;
      ColDivs.forEach((col) => {
        (col as HTMLElement).style.width = `${newWidth}px`;
      });
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.pageX);

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        handleMove(touch.pageX);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      document.addEventListener("mousemove", onMouseMove);
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      document.addEventListener("touchmove", onTouchMove);
    };

    BRDWrapperDiv.addEventListener("mousedown", onMouseDown);
    BRDWrapperDiv.addEventListener("touchstart", onTouchStart);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
    });
    document.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", onTouchMove);
    });

    return () => {
      BRDWrapperDiv.removeEventListener("mousedown", onMouseDown);
      BRDWrapperDiv.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("mouseup", () => {
        document.removeEventListener("mousemove", onMouseMove);
      });
      document.removeEventListener("touchend", () => {
        document.removeEventListener("touchmove", onTouchMove);
      });
    };
  }, []);
  //}, [wrapperid, id, colID, paddingBetweenColumns]);

  return { wrapperid };
};
