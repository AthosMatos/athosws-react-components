import type { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import type { CSSProperties, PropsWithChildren } from "react";
import { createContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { BaseItem } from "..";

interface Props<T extends BaseItem> {
  id: UniqueIdentifier;
  update?(changeItems: T[]): void;
  items?: T[];
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
  setIsDeleting(isDeleting: boolean): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
  setIsDeleting() {},
});

function animateLayoutChanges(args) {
  const { isSorting, wasDragging } = args;

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
}

const duration = 200;

const OpacityDiv = styled.div<{ isDeleting: boolean }>`
  ${(props) =>
    props.isDeleting &&
    `
  opacity: 0 !important;
  transform: scale(0) !important;
  transition: all ${duration}ms ease-out !important;

  `};
`;

function SortableItem<T extends BaseItem>({ children, id, update, items }: PropsWithChildren<Props<T>>) {
  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
    id,
    animateLayoutChanges,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
      setIsDeleting,
    }),
    [attributes, listeners, setActivatorNodeRef, setIsDeleting]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };
  useEffect(() => {
    if (isDeleting) {
      setTimeout(() => {
        update && items && update(items.filter((i) => i.id !== id));
        setIsDeleting(false);
      }, duration);
    }
  }, [isDeleting]);

  return (
    <SortableItemContext.Provider value={context}>
      <motion.div
        animate={
          isDeleting && {
            opacity: 0,
            scale: 0,
          }
        }
        transition={{ ease: "anticipate" }}
      >
        <motion.div style={style} ref={setNodeRef}>
          {children}
        </motion.div>
      </motion.div>
    </SortableItemContext.Provider>
  );
}

export default SortableItem;

export { SortableItemContext };
