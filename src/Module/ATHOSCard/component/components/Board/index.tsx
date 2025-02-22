import { Droppable } from "react-beautiful-dnd";
import { BoardI, IGlobalStyle } from "../../interface";
import ATHOSCard from "../Card";

const ATHOSCardBoard = ({
  id,
  direction = "vertical",
  cards,
  className,
  style,
  GclassName,
  Gstyle,
  OuterWrapperClass,
  OuterWrapperStyle,
  cardsClassName,
  cardsStyle,
}: BoardI & {
  id: string;
} & IGlobalStyle) => {
  return (
    <Droppable direction={direction} droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ ...style, ...Gstyle?.boardStyle }}
          className={`m-1 ${direction == "vertical" ? "flex-col" : ""} ${className} ${GclassName?.boardClassName} flex`}
        >
          {cards.map((card, index) => (
            <ATHOSCard
              key={card.header.title}
              {...card}
              index={index}
              GclassName={GclassName}
              Gstyle={Gstyle}
              className={`${card.className} ${cardsClassName}`}
              style={{ ...card.style, ...cardsStyle }}
              OuterWrapperClass={`${card.OuterWrapperClass}  ${OuterWrapperClass}`}
              OuterWrapperStyle={{ ...card.OuterWrapperStyle, ...OuterWrapperStyle }}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ATHOSCardBoard;
