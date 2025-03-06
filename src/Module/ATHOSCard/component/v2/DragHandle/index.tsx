import { useContext } from "react";
import { SortableItemContext } from "../Item";

export function DragHandle(props: React.HTMLAttributes<HTMLButtonElement>) {
  const { attributes, listeners, ref } = useContext(SortableItemContext);
  const { children } = props;
  return (
    <button {...props} className={`${props.className} cursor-grab`} {...attributes} {...listeners} ref={ref}>
      {children}
    </button>
  );
}
