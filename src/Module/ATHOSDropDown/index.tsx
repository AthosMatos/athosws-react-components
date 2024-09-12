import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ReactDOM from "react-dom";
import useADD from "./hooks/useADD";
import { ATHOSDropDownProps } from "./interfaces";
import { ADDChildWrapper, ADDContainer, ADDLabel } from "./styled";

/**
 * A customizable dropdown menu that renders outside the normal DOM hierarchy using `ReactDOM.createPortal`.
 * It supports custom positioning (top/bottom, left/right) and displays a list of clickable labels.
 * The dropdown is animated using `Framer Motion` and automatically closes when needed.
 *
 * Props:
 * - `children`: A function to render the trigger element, with a ref passed for positioning.
 * - `open`: Controls the visibility of the dropdown.
 * - `close`: Function to close the dropdown.
 * - `positionVert`: Vertical position of the dropdown ('top' or 'bottom').
 * - `positionHor`: Horizontal position of the dropdown ('left' or 'right').
 * - `id`: Unique identifier for the dropdown.
 * - `labels`: Array of labels, each with a `label` text and an `onClick` handler.
 *
 * Example usage:
 *
 * ```tsx
 * <ATHOSDropDown
 *   open={dropdownOpen}
 *   close={handleCloseDropdown}
 *   positionVert="bottom"
 *   positionHor="left"
 *   id="example-dropdown"
 *   labels={[
 *     { label: "Option 1", onClick: () => console.log("Option 1 clicked") },
 *     { label: "Option 2", onClick: () => console.log("Option 2 clicked") },
 *   ]}
 * >
 *   {(ref) => (
 *     <button ref={ref} onClick={() => setDropdownOpen(!dropdownOpen)}>
 *       Toggle Dropdown
 *     </button>
 *   )}
 * </ATHOSDropDown>
 * ```
 */

const ATHOSDropDown = ({
  children,
  open,
  positionVert,
  positionHor,
  id,
  labels,
  close,
}: ATHOSDropDownProps) => {
  const [dropdownRoot, setDropdownRoot] = useState<HTMLElement | null>(null);

  const { childRef, childSize, containerRef } = useADD({
    positionVert,
    positionHor,
    id,
    close,
    setDropdownRoot,
  });
  // If dropdownRoot is null, don't render anything yet
  if (!dropdownRoot) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {open && (
            <ADDContainer
              ref={containerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              top={childSize?.top}
              left={childSize?.left}
              right={childSize?.right}
              bottom={childSize?.bottom}
              transform={childSize?.transform}
            >
              <ADDChildWrapper>
                {labels.map((label) => (
                  <ADDLabel onClick={label.onClick}>{label.label}</ADDLabel>
                ))}
              </ADDChildWrapper>
            </ADDContainer>
          )}
        </AnimatePresence>,
        dropdownRoot
      )}
      {children(childRef)}
    </>
  );
};

export { ATHOSDropDown };
