import { Droppable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";
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
  setIsDragging,
  OuterWrapperClass,
  OuterWrapperStyle,
  cardsClassName,
  cardsStyle,
  isTrash,
}: BoardI & {
  id: string;
  setIsDragging: React.Dispatch<React.SetStateAction<string>>;
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
          {!isTrash && cards?.length
            ? cards.map((card, index) => (
                <ATHOSCard
                  setIsDragging={setIsDragging}
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
              ))
            : []}

          {isTrash && <FaTrash className="text-8xl text-red-500 cursor-pointer" />}
          {!isTrash && provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ATHOSCardBoard;
