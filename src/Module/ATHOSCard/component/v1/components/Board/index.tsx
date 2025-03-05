import { AnimatePresence } from "framer-motion";
import { Droppable } from "react-beautiful-dnd";
import { BoardI } from "../../interface";
import ATHOSCard from "../Card";

const ATHOSCardBoard = (props: BoardI & { placeholderProps }) => {
  const {
    id,
    cards = [],
    placeholderProps,
    postChildren,
    preChildren,
    removeSelf,
    setIsDeleting,
    isDeleting,
    direction,
    className,
    style,
  } = props;

  return (
    <Droppable direction={direction} droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            ...{
              //backgroundColor: snapshot.isDraggingOver ? "lightblue" : "transparent",
            },
            ...style,
          }}
          className={`flex ${direction === "vertical" ? "flex-col" : ""}${className}`}
        >
          {preChildren}
          <AnimatePresence>
            {cards.map((card) => (
              <ATHOSCard
                key={card.id}
                {...card}
                removeSelf={() => removeSelf(card.id, id)}
                setIsDeleting={setIsDeleting}
                isDeleting={isDeleting}
              />
            ))}
          </AnimatePresence>
          {provided.placeholder}
          <div
            style={{
              position: "absolute",
              top: placeholderProps.clientY,
              left: placeholderProps.clientX,
              height: placeholderProps.clientHeight,
              background: "tomato",
              width: placeholderProps.clientWidth,
            }}
          />
          {postChildren}
        </div>
      )}
    </Droppable>
  );
};

export default ATHOSCardBoard;
