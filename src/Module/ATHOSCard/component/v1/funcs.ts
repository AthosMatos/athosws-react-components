import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { ATHOSCardProps, BoardI } from "./interface";

const reorder = (list: ATHOSCardProps[], startIndex: number, endIndex: number) => {
  const result: ATHOSCardProps[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const onEnd = (
  dropRes: { res: DropResult; provided: ResponderProvided },
  state: { boards: BoardI[]; setBoards: (arg0: BoardI[]) => void }
) => {
  const { res } = dropRes;
  const { boards, setBoards } = state;
  // dropped outside the list
  if (!res.destination) {
    return;
  }

  if (res.source.droppableId === res.destination.droppableId) {
    const preItems = boards.find((board) => board.id === res.source.droppableId)?.cards;
    //console.log(preItems);
    const newItems = reorder(preItems, res.source.index, res.destination.index).map((card, cardIndex) => {
      return {
        ...card,
        index: cardIndex,
      };
    });
    //console.log(newItems);
    setBoards(
      boards.map((board) => {
        if (board.id === res.source.droppableId) {
          return {
            ...board,
            cards: newItems,
          };
        }
        return board;
      })
    );
  } else {
    const source = boards.find((board) => board.id === res.source.droppableId);
    const destination = boards.find((board) => board.id === res.destination?.droppableId);
    if (!source || !destination) return;
    const sourceItems = Array.from(source.cards || []);
    const destinationItems = Array.from(destination.cards || []);

    const [removed] = sourceItems.splice(res.source.index, 1);
    destinationItems.splice(res.destination.index, 0, removed);

    setBoards(
      boards.map((board, index) => {
        if (board.id === res.source.droppableId) {
          return {
            ...board,
            cards: sourceItems,
          };
        } else if (board.id === res.destination?.droppableId) {
          return {
            ...board,
            cards: destinationItems,
          };
        }
        return board;
      })
    );
  }
};
