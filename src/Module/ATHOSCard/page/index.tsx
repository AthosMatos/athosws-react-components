import { DndContext, useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { CSSProperties } from "styled-components";
/* const ATHOSCardPage = () => {
  const [boards, setBoards] = useState<BoardI[]>([
    {
      direction: "horizontal",
      cards: [
        {
          header: {
            icon: <BiCalendar className="text-2xl" />,
            title: "Agenda Semanal",
            className: "font-bold ",
          },
          component: <div className="">Content</div>,
        },
        {
          header: {
            title: "Atuaçôes do mês",
            className: "font-bold ",
          },
        },
        {
          header: {
            title: "Peças",
            className: "font-bold ",
          },
        },
      ],
    },
    {
      direction: "horizontal",
    },
    {
      isTrash: true,
    },
  ]);

  return (
    <div>
      <ATHOSCards
        className="flex-col"
        GclassName={{
          boardClassName: "w-full !m-0 border border-white min-h-[300px] dark:border-white dark:border-opacity-10",
          cardOuterWrapperClassName: "w-full max-w-[500px]",
          cardClassName: "border border-black border-opacity-10 dark:border-white dark:border-opacity-10 rounded-lg",
          headerClassName: "dark:text-white text-black justify-between py-2 pb-0 px-3 gap-4 w-full",
        }}
        updateBoards={setBoards}
        boards={boards}
      />
    </div>
  );
}; */

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });
  const style: CSSProperties = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Transform.toString(transform),
    transition: transition,
    position: "relative",
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="border w-fit border-black text-black dark:border-white dark:text-white dark:border-opacity-10 dark:text-opacity-90 rounded-lg"
    >
      {props.children}
    </button>
  );
}
function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-black border-opacity-10 dark:border-white dark:border-opacity-10 rounded-lg"
    >
      {props.children}
    </div>
  );
}

const ATHOSCardPage = () => {
  const [parent, setParent] = useState(null);
  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">{parent === "droppable" ? draggable : "Drop here"}</Droppable>
    </DndContext>
  );

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }
};
export default ATHOSCardPage;
