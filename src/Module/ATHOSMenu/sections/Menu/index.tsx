import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import ColoredDiv from "../../components/ColoredDiv";
import { AMState } from "../../redux/store";
import MenuOption from "./MenuOption";

const Menu = () => {
  const colors = useSelector((state: AMState) => state.AMPropsReducer.generalColors?.menu);
  const options = useSelector((state: AMState) => state.AMPropsReducer.options);
  const maxMenuHeight = useSelector((state: AMState) => state.AMPropsReducer.maxMenuHeight);
  const blur = !!useSelector((state: AMState) => state.AMPropsReducer.blur?.menu);
  const id = useMemo(() => v4(), []);
  const [overflow, setOverflow] = useState<any>("hidden");
  useEffect(() => {
    //watch div height, if it is bigger than maxMenuHeight or 50% of the screen height, set overflow-y to scroll
    const div = document.getElementById(id);
    if (!div) return;
    const sizeLimit = maxMenuHeight || window.innerHeight / 2;

    const handle = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.contentRect.height > sizeLimit) {
          setOverflow("scroll");
        } else {
          setOverflow("hidden");
        }
      }
    };

    const resizeObserver = new ResizeObserver(handle);
    resizeObserver.observe(div);

    // Cleanup observer on component unmount
    return () => {
      resizeObserver.unobserve(div);
      resizeObserver.disconnect();
    };
  }, [maxMenuHeight]);

  return (
    <ColoredDiv
      id={id}
      style={{
        overflowY: overflow,
        maxHeight: maxMenuHeight,
      }}
      scaleAnim={false}
      specificColors={colors}
      className={`w-full ${blur ? "backdrop-blur-[2px]" : ""} rounded-lg flex-col p-2 gap-1 max-h-[50vh] border-[rgba(0,0,0,0.55)] border`}
    >
      {options.map((opt, index) => {
        return <MenuOption key={`${opt.label}-${index}`} {...opt} index={index} />;
      })}
    </ColoredDiv>
  );
};

export default Menu;
