import { useMemo } from "react";
import { v4 } from "uuid";
import { ATHOSDropDownProps, LabelI } from "./interfaces";
/**
 *
 */
const transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const ListItem = ({
  option,
  onClick,
  className,
  style,
}: {
  option: LabelI;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const defaultClassName = `cursor-pointer select-none `;

  return (
    <li
      style={{
        ...style,
        ...option.style,
      }}
      onClick={onClick}
      className={`${defaultClassName} ${className} ${option.className}`}
    >
      {option.label}
    </li>
  );
};

const ATHOSDropDown = ({
  children,
  labelsStyle,
  position = "top-left",
  spacing = 6,
  labels,
  style,
  className,
  labelsClassName,
}: ATHOSDropDownProps) => {
  const id = useMemo(() => v4(), []);
  const pos =
    position === "top-left"
      ? "dropdown-top dropdown-end"
      : position === "top-right"
      ? "dropdown-top"
      : position === "bottom-left"
      ? "dropdown-bottom dropdown-end"
      : position === "bottom-right"
      ? "dropdown-bottom"
      : position === "left"
      ? "dropdown-left dropdown-center"
      : position === "right"
      ? "dropdown-right dropdown-center"
      : position === "top"
      ? "dropdown-top dropdown-center"
      : position === "bottom" && "dropdown-bottom dropdown-center";

  const gap = useMemo(
    () =>
      position.includes("top")
        ? { marginBottom: `${spacing}px` }
        : position.includes("bottom")
        ? { marginTop: `${spacing}px` }
        : position.includes("left")
        ? { marginRight: `${spacing}px` }
        : { marginLeft: `${spacing}px` },
    [spacing, position]
  );

  return (
    <div className={`${pos}`}>
      <button popoverTarget={id} style={{ anchorName: `--anchor-${id}` } as any}>
        {children}
      </button>
      <ul
        className={`dropdown flex flex-col rounded-box shadow-sm ${className}`}
        popover="auto"
        id={id}
        style={{ ...style, ...gap, positionAnchor: `--anchor-${id}` } as any}
      >
        {labels.map((option, index) => (
          <ListItem style={labelsStyle} className={labelsClassName} key={index} onClick={option.onClick} option={option} />
        ))}
      </ul>
    </div>
  );
};

export { ATHOSDropDown };
