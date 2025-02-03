import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ATHOSModal } from "./Module/ATHOSModal";

const Categorias_Modal = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const scrollDivRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const scrollToX = () => {
    if (scrollDivRef.current) {
      const width = scrollDivRef.current.clientWidth;
      controls.start({
        x: -width,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  };

  useEffect(() => {
    if (selectedOption !== 0) {
      scrollToX();
    }
  }, [selectedOption]);

  const options = ["Criar", "Editar", "Deletar"];
  // fake data generator
  const getItems = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

  // a little function to help us with reordering the result
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  });

  const [items, setItens] = useState(getItems(10));

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const ite = reorder(items, result.source.index, result.destination.index);

    setItens(ite);
  };

  const [open, setOpen] = useState(false);
  return (
    <div>
      {/*  <DragDropContext onDragEnd={onDragEnd}>
        <div ref={scrollDivRef} className="w-[calc(100vw/3)] overflow-x-hidden h-screen">
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext> */}
      <ATHOSModal show={open} hide={() => setOpen(false)}>
        <div className="w-[calc(100vw/3)] overflow-x-hidden h-[calc(100vh/3)] p-4 bg-white rounded-md">
          <div className=" ">
            <h1>Modal</h1>
            <p>Conteudo do modal</p>
          </div>
        </div>
      </ATHOSModal>
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Open Modal
      </button>
    </div>
  );
};

export default Categorias_Modal;
