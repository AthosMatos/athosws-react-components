import { AnimatePresence, motion } from "framer-motion";
import { usePopUp } from "../../hooks/private/usePopUp";
import { ATHOSDropDownProps, ATHOSDropDownPropsCols, ATHOSDropDownPropsList, LabelI } from "./interfaces";

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

const ATHOSDropDown = (props: ATHOSDropDownProps) => {
  const {
    children,
    className,
    labelsStyle,
    position = "bottom-left",
    style,
    spacing,
    matchChildrenWidth = false,
    onToggle,
    labelClassName,
    buttonClassName,
    buttonStyle,
  } = props;

  const { childRef, gap, id, pos, contentRef, setIsOpened, isOpened } = usePopUp({
    onToggle,
    matchChildrenWidth,
    position,
    spacing,
  });

  // Type guard function to check if we have labels
  const hasLabels = (props: ATHOSDropDownProps): props is ATHOSDropDownPropsList => {
    return "labels" in props && Array.isArray(props.labels);
  };

  // Type guard function to check if we have cols
  const hasCols = (props: ATHOSDropDownProps): props is ATHOSDropDownPropsCols => {
    return "cols" in props && Array.isArray(props.cols);
  };
  return (
    <div className={`${pos}`}>
      <button
        className={buttonClassName}
        onClick={() => setIsOpened((prev) => !prev)}
        ref={childRef}
        popoverTarget={id}
        style={
          {
            anchorName: `--anchor-${id}`,
            ...buttonStyle,
          } as any
        }
      >
        {children}
      </button>
      <AnimatePresence>
        {isOpened && (
          <motion.ul
            ref={contentRef}
            className={`dropdown flex flex-col rounded-box shadow-sm ${className}`}
            popover="auto"
            id={id}
            style={{ ...style, ...gap, positionAnchor: `--anchor-${id}` } as any}
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
          >
            {hasLabels(props)
              ? props.labels?.map((option, index) => (
                  <ListItem style={labelsStyle} className={labelClassName} key={index} onClick={option.onClick} option={option} />
                ))
              : hasCols(props)
              ? props.cols?.map((colGroup, index) => (
                  <div key={index} className={`flex ${props.colClassName}`} style={props.colStyle}>
                    {colGroup.map((option, index) => (
                      <ListItem style={labelsStyle} className={labelClassName} key={index} onClick={option.onClick} option={option} />
                    ))}
                  </div>
                ))
              : null}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ATHOSDropDown };
