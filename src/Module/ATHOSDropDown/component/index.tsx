import { usePopUp } from "../../hooks/private/usePopUp";
import { ATHOSDropDownProps, LabelI } from "./interfaces";
/**
 *
 */

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
  labelClassName: labelsClassName,
  matchChildrenWidth,
  onToggle,
}: ATHOSDropDownProps) => {
  const { childRef, gap, id, pos, contentRef, setIsOpened } = usePopUp({
    onToggle,
    matchChildrenWidth,
    position,
    spacing,
  });

  return (
    <div className={`${pos}`}>
      <button
        onClick={() => setIsOpened((prev) => !prev)}
        ref={childRef}
        popoverTarget={id}
        style={{ anchorName: `--anchor-${id}` } as any}
      >
        {children}
      </button>
      <ul
        ref={contentRef}
        className={`dropdown flex flex-col rounded-box shadow-sm ${className}`}
        popover="auto"
        id={id}
        style={{ ...style, ...gap, positionAnchor: `--anchor-${id}` } as any}
      >
        {labels?.map((option, index) => (
          <ListItem style={labelsStyle} className={labelsClassName} key={index} onClick={option.onClick} option={option} />
        ))}
      </ul>
    </div>
  );
};

export { ATHOSDropDown };
