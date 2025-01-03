import { DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { reorder } from "../../utils/sort-utils";

import { useATHOSSideMenu } from "../context/context";
import { ASMC, ASMWrapper, hiddenMenuWidth, sideMenuWidth } from "../styled";
import BottomIcons from "./Options/BottomIcons";
import ASMOption from "./Options/Option";
import { SelectedDataTrackOptI } from "./Options/Option/interfaces";
import ASMSubOption from "./Options/SubOption";

export const ASM = () => {
  const {
    selectedDataTrack,
    hideMenu,
    dropId,
    setSelectedData,
    props: { onReorder, colors },
  } = useATHOSSideMenu();
  const onEnd = (res: DropResult, provided: ResponderProvided) => {
    // dropped outside the list
    if (!res.destination) {
      return;
    }
    if (res.source.droppableId === res.destination.droppableId) {
      const newItems = reorder<SelectedDataTrackOptI>(selectedDataTrack, res.source.index, res.destination.index);

      setSelectedData(newItems);
      onReorder && onReorder(newItems);
    }
  };

  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId={dropId}>
        {(provided) => (
          <ASMC
            style={{
              backgroundColor: colors.background,
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
            width={hideMenu ? hiddenMenuWidth : sideMenuWidth}
          >
            <ASMWrapper>
              {selectedDataTrack.map((option, index) => (
                <ASMOption key={option.id} index={index} option={option}>
                  {option.subOptions &&
                    option.subOptions.map((subOption) => <ASMSubOption key={subOption.id} subopt={subOption} parentId={option.id} />)}
                </ASMOption>
              ))}
            </ASMWrapper>
            <BottomIcons />
          </ASMC>
        )}
      </Droppable>
    </DragDropContext>
  );
};
