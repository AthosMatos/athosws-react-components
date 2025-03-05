import type { DropAnimation } from "@dnd-kit/core";
import { DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import type { PropsWithChildren, ReactNode } from "react";
import { BaseItem } from "..";
import SortableItem from "../Item";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

interface Props {}

export function SortableOverlay({ children }: PropsWithChildren<Props>) {
  return <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>;
}

function Overlay<T extends BaseItem>({ activeItem, renderItem }: { activeItem: T; renderItem: (item: T) => ReactNode }) {
  return <SortableOverlay>{activeItem ? <SortableItem id={activeItem.id}>{renderItem(activeItem)}</SortableItem> : null}</SortableOverlay>;
}

export default Overlay;
