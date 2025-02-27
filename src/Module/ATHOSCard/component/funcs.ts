import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { ATHOSCardProps, BoardI } from "./interface";

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result: ATHOSCardProps[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const onEnd = (
  dropRes: { res: DropResult; provided: ResponderProvided },
  state: { updateBoards: (arg0: BoardI[]) => void; boards: BoardI[] }
) => {
  const { res } = dropRes;
  const { updateBoards, boards } = state;
  // dropped outside the list
  if (!res.destination) {
    return;
  }

  if (res.source.droppableId === res.destination.droppableId) {
    const newItems = reorder(
      boards.find((_, index) => index.toString() === res.source.droppableId)?.cards,
      res.source.index,
      res.destination.index
    );

    updateBoards(boards.map((board, index) => (index.toString() === res.source.droppableId ? { ...board, cards: newItems } : board)));
  } else {
    const source = boards.find((_, index) => index.toString() === res.source.droppableId);
    const destination = boards.find((_, index) => index.toString() === res.destination?.droppableId);
    if (!source || !destination) return;
    const sourceItems = Array.from(source.cards || []);
    const destinationItems = Array.from(destination.cards || []);

    if (!destination.isTrash) {
      const [removed] = sourceItems.splice(res.source.index, 1);
      destinationItems.splice(res.destination.index, 0, removed);
    } else {
      //remove from source
      sourceItems.splice(res.source.index, 1);
    }
    updateBoards(
      boards.map((board, index) => {
        if (index.toString() === res.source.droppableId) {
          return {
            ...board,
            cards: sourceItems,
          };
        }
        if (index.toString() === res.destination?.droppableId) {
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

export const onEndDeleteDrop = (
  dropRes: { res: DropResult; provided: ResponderProvided },
  state: { updateBoards: (arg0: BoardI[]) => void; boards: BoardI[] }
) => {
  console.log("delete");
  const { res } = dropRes;
  const { updateBoards, boards } = state;

  const source = boards.find((_, index) => index.toString() === res.source.droppableId);
  console.log("source", source);
  if (!source) return;

  const sourceItems = Array.from(source.cards);
  sourceItems.splice(res.source.index, 1); // Remove the dropped item
  const newboards = boards.map((board, index) => (index.toString() === res.source.droppableId ? { ...board, cards: sourceItems } : board));
  console.log("newboards", newboards);

  updateBoards(newboards);
};
