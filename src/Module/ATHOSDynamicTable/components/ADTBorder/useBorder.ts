import { useEffect } from "react";
import { v4 } from "uuid";
import { useADTContext } from "../../context";

export const useADTBorder = (colID: string) => {
  const wrapperid = v4().toString();
  const id = v4().toString();

  //const [doubleClicked, setDoubleClicked] = useState(false);
  const {
    props: { paddingBetweenColumns },
  } = useADTContext();
  useEffect(() => {
    const BRDWrapperDiv = document.getElementById(wrapperid);
    const BRD = document.getElementById(id);
    const ColDiv = document.getElementById(colID);
    if (!BRDWrapperDiv || !ColDiv || !BRD) return;

    const handleMove = (pageX: number) => {
      const BRDWrapperDivRect = BRDWrapperDiv.getBoundingClientRect();
      const ColDivRect = ColDiv.getBoundingClientRect();
      const ColDivWidth = ColDivRect.width;
      const Plus = Math.round(
        pageX -
          (BRDWrapperDivRect.right +
            (paddingBetweenColumns ? paddingBetweenColumns * 2 - 5 : 8))
      ); //+20 to centralize in the cursor
      const newWidth = ColDivWidth + Plus;
      ColDiv.style.width = `${newWidth}px`;
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
