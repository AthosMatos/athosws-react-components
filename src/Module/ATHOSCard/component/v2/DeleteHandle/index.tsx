import { useContext } from "react";
import { SortableItemContext } from "../Item";

export function DeleteHandle(props: React.HTMLAttributes<HTMLButtonElement>) {
  const { setIsDeleting } = useContext(SortableItemContext);
  const { children } = props;
  return (
    <button {...props} onClick={() => setIsDeleting(true)}>
      {children}
    </button>
  );
}
