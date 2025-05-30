import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Cols from "./components/Cols";
import { Label } from "./components/Label";
import Labels from "./components/Labels";
import SearchBar from "./components/SearchBar";
import Selected from "./components/Selected";
import { ATHOSSelectProvider, useATHOSSelectContext } from "./context";
import { ATHOSSelectedProps } from "./intefaces";

const AS = (props: ATHOSSelectedProps) => {
  const { listContainerStyle, listContainerClassName, onToggleOpen: onToggle, search: withSearch, inline, thin } = props;

  const [overHidden, setOverHidden] = useState(true);

  const { labels, cols, childRef, contentRef, gap, id, isOpened, pos, setIsOpened } = useATHOSSelectContext();

  useEffect(() => {
    if (isOpened) {
      setTimeout(() => {
        setOverHidden(false);
      }, 200);
    }
    setOverHidden(true);
  }, [isOpened]);

  return (
    <div className={`${inline ? "" : pos}`}>
      {!thin && <Label />}
      <Selected childRef={childRef} id={id} setIsOpened={setIsOpened} isOpened={isOpened} />

      <AnimatePresence>
        {isOpened && (
          <motion.ul
            ref={contentRef}
            className={`dropdown ${inline ? "" : "w-full"} flex flex-col rounded-box ${listContainerClassName}`}
            popover={!inline ? "auto" : undefined}
            id={id}
            style={
              {
                ...listContainerStyle,
                ...gap,
                positionAnchor: !inline ? `--anchor-${id}` : undefined,
                overflow: overHidden ? "hidden" : "auto",
              } as any
            }
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: {
                height: 0,
              },
              open: {
                height: "auto",
              },
            }}
            /*   transition={CollapseTransition} */
          >
            {withSearch && <SearchBar />}
            {labels ? <Labels {...(props as any)} /> : cols ? <Cols {...(props as any)} /> : null}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const ATHOSSelect = (props: ATHOSSelectedProps) => {
  return (
    <ATHOSSelectProvider {...props}>
      <AS {...props} />
    </ATHOSSelectProvider>
  );
};

export { ATHOSSelect };
