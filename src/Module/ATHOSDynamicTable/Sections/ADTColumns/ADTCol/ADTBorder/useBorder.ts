import { useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { ADTState } from "../../../../redux/store";

export const useADTBorder = (colID: string) => {
  const wrapperid = v4();
  const id = v4();

  //const [doubleClicked, setDoubleClicked] = useState(false);

  const { paddingBetweenColumns } = useSelector(
    (state: ADTState) => state.ADTPropsReducer
  );

  useEffect(() => {
    const BRDWrapperDiv = document.getElementById(wrapperid);
    const BRD = document.getElementById(id);
    const ColDivs = document.querySelectorAll(`[id="${colID}"]`);

    if (!BRDWrapperDiv || !ColDivs.length || !BRD) return;

    const handleMove = (pageX: number) => {
      const BRDWrapperDivRect = BRDWrapperDiv.getBoundingClientRect();
      const ColDivRect = ColDivs[0].getBoundingClientRect();
      const ColDivWidth = ColDivRect.width;
      const Plus = Math.round(
        pageX -
          (BRDWrapperDivRect.right +
            (paddingBetweenColumns ? paddingBetweenColumns * 2 - 5 : 8))
      ); //+20 to centralize in the cursor
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

  return { wrapperid, id };
};
