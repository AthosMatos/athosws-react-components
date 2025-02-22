import { DragDropContext } from "react-beautiful-dnd";
import ATHOSCardBoard from "./components/Board";
import { onEnd } from "./funcs";
import { ATHOSCardsProps } from "./interface";

const ATHOSCards = ({ boards, updateBoards, GclassName, Gstyle, className, style }: ATHOSCardsProps) => {
  return (
    <DragDropContext onDragEnd={(res, provided) => onEnd({ res, provided }, { updateBoards, boards })}>
      <div style={style} className={`flex ${className}`}>
        {boards.map((board, index) => (
          <ATHOSCardBoard {...board} id={index.toString()} key={index} GclassName={GclassName} Gstyle={Gstyle} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default ATHOSCards;
