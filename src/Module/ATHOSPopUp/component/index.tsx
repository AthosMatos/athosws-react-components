import { usePopUp } from "../../hooks/private/usePopUp";
import { ATHOSPopUpProps } from "./interfaces";

const ATHOSPopUp = ({
  children,
  onToggle,
  position = "top",
  contentClassName,
  content,
  style,
  matchChildrenWidth,
  spacing,
  className,
  contentStyle,
}: ATHOSPopUpProps) => {
  const { childRef, gap, id, pos, contentRef, setIsOpened } = usePopUp({
    onToggle,
    matchChildrenWidth,
    position,
    spacing,
  });

  return (
    <div className={`${pos}`}>
      <button
        className={className}
        onClick={() => setIsOpened((prev) => !prev)}
        ref={childRef}
        popoverTarget={id}
        style={{ ...style, anchorName: `--anchor-${id}` } as any}
      >
        {children}
      </button>
      <ul
        ref={contentRef}
        className={`dropdown flex flex-col ${contentClassName}`}
        popover="auto"
        id={id}
        style={
          {
            boxShadow: "2px 8px 20px rgba(0, 0, 0, 0.14)",
            ...contentStyle,
            ...gap,
            positionAnchor: `--anchor-${id}`,
          } as any
        }
      >
        {content}
      </ul>
    </div>
  );
};

export { ATHOSPopUp };
