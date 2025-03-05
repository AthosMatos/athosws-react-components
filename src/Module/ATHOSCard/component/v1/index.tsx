import { useCallback, useEffect, useMemo, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from "uuid";
import ATHOSCardBoard from "./components/Board";
import { onEnd } from "./funcs";
import { BoardI, CreateBoardI } from "./interface";

interface ATHOSCardsProps {
  boards: CreateBoardI[];
  setBoards: React.Dispatch<React.SetStateAction<BoardI[]>>;
  deleteMode?: boolean;
}
export const ATHOSCards = ({ boards, setBoards, deleteMode }: ATHOSCardsProps) => {
  const orderedBoards: BoardI[] = useMemo(() => {
    return boards.map((board: any) => {
      return {
        ...board,
        id: board.id || v4(),
        cards: board.cards.map((card, index) => {
          return {
            ...card,
            id: card.id || v4(),
            index,
          };
        }),
      };
    });
  }, [boards]);
  const [firstInit, setFirstInit] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [placeholderProps, setPlaceholderProps] = useState<any>({});

  const removeSelf = useCallback(
    (id: string, boardId: string) => {
      setBoards((prev) => {
        const newBoards = prev.map((board) => {
          if (board.id === boardId) {
            return {
              ...board,
              cards: board.cards.filter((c) => c.id !== id),
            };
          }
          return board;
        });
        return newBoards;
      });
    },
    [setBoards]
  );

  useEffect(() => {
    if (firstInit) {
      setFirstInit(false);
      setBoards(orderedBoards);
    }
  }, [orderedBoards]);

  return (
    <DragDropContext
      onDragEnd={(res, provided) => {
        onEnd({ res, provided }, { boards: orderedBoards, setBoards });
        setPlaceholderProps({});
      }}
    >
      {orderedBoards.map((board) => (
        <ATHOSCardBoard
          placeholderProps={placeholderProps}
          key={board.id}
          {...board}
          removeSelf={removeSelf}
          setIsDeleting={setIsDeleting}
          isDeleting={isDeleting}
        />
      ))}
    </DragDropContext>
  );
};
