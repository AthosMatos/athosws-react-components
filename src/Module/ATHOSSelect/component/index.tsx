import { usePopUp } from "../../hooks/private/usePopUp";
import Cols from "./components/Cols";
import Labels from "./components/Labels";
import Selected from "./components/Selected";
import { ATHOSSelectProvider, useATHOSSelectContext } from "./context";
import { ATHOSSelectedProps } from "./intefaces";

const AS = (props: ATHOSSelectedProps) => {
  const { listContainerStyle, position, spacing, listContainerClassName, onToggleOpen: onToggle, matchLabelWidth } = props;
  const { childRef, gap, id, pos, contentRef, setIsOpened, isOpened } = usePopUp({
    onToggle,
    matchChildrenWidth: matchLabelWidth,
    position,
    spacing,
  });

  const { labels, cols } = useATHOSSelectContext();
  return (
    <div className={`${pos}`}>
      <Selected childRef={childRef} id={id} setIsOpened={setIsOpened} isOpened={isOpened} />

      <ul
        ref={contentRef}
        className={`dropdown flex flex-col rounded-box shadow-sm ${listContainerClassName}`}
        popover="auto"
        id={id}
        style={{ ...listContainerStyle, ...gap, positionAnchor: `--anchor-${id}` } as any}
      >
        {labels ? <Labels {...(props as any)} /> : cols ? <Cols {...(props as any)} /> : null}
      </ul>
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
