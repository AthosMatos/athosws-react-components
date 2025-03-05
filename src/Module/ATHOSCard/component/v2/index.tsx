import type { Active, Over } from "@dnd-kit/core";
import { DndContext, KeyboardSensor, MeasuringStrategy, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { ReactNode } from "react";
import React, { useMemo, useState } from "react";
import SortableItem from "./Item";
import Overlay from "./Overlay";

const ArrayMove = (array: any[], from: number, to: number) => {
  const newArray = [...array];
  const startIndex = to < 0 ? newArray.length + to : to;
  const item = newArray.splice(from, 1)[0];
  newArray.splice(startIndex, 0, item);
  return newArray;
};

export interface BaseItem {
  id: string;
}

interface Props<T extends BaseItem> {
  items: T[];
  update(changeItems: T[]): void;
  render(item: T): ReactNode;
}

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export function ATHOSCards<T extends BaseItem>(props: React.HTMLAttributes<HTMLDivElement> & Props<T>) {
  const { items, update, render } = props;
  const [active, setActive] = useState<Active | null>(null);

  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const onDragStart = ({ active }: { active: Active }) => {
    setActive(active);
  };
  const onDragEnd = ({ active, over }: { active: Active; over: Over }) => {
    if (over && active.id !== over?.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);

      update(ArrayMove(items, activeIndex, overIndex));
    }
    setActive(null);
  };
  const onDragCancel = () => {
    setActive(null);
  };
  return (
    <DndContext measuring={measuringConfig} sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragCancel={onDragCancel}>
      <SortableContext items={items}>
        <div {...props}>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <SortableItem items={items} update={update} id={item.id}>
                {render(item)}
              </SortableItem>
            </React.Fragment>
          ))}
        </div>
      </SortableContext>
      <Overlay activeItem={activeItem} renderItem={render} />
    </DndContext>
  );
}
