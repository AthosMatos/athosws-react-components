import { ReactNode } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { JvrisColors } from "../colors/colors";

const JCContainer = styled.div`
    display: flex;
    /* flex-wrap: wrap;
    justify-content: space-between; */
`;

const JCGWrapper = styled.div`
    overflow: auto;
`;

interface JvrisCardProps {
    id: string;
    index: number;
    component?: ReactNode;
    wrapperStyle?: React.CSSProperties;
    globalCardWrapperStyle?: React.CSSProperties;
}

const JCWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    //padding: 1rem;
    border: 1px solid ${JvrisColors.grey.light};
    border-radius: 5px;
    background-color: ${JvrisColors.grey.light_2};
    width: fit-content;
    height: fit-content;
`;

const JCText = styled.label`
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    text-align: center;
`;

const JvrisCard = ({
    id,
    index,
    component,
    wrapperStyle,
    globalCardWrapperStyle
}: JvrisCardProps) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <JCWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                        ...globalCardWrapperStyle,
                        ...wrapperStyle,
                        ...provided.draggableProps.style
                    }}
                >
                    <div
                        {...provided.dragHandleProps}
                        style={{
                            width: "30px",
                            height: "10px",
                            backgroundColor: "red"
                        }}
                    />
                    {component ? component : <JCText>{id}</JCText>}
                </JCWrapper>
            )}
        </Draggable>
    );
};

interface JvrisCardGroupProps {
    id: string;
    title: string;
    children: JvrisCardProps[];
    style?: React.CSSProperties;
    globalCardWrapperStyle?: React.CSSProperties;
}

const JCGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid ${JvrisColors.grey.light_2};
    border-radius: 5px;
    background-color: ${JvrisColors.grey.lighter};
    height: fit-content;
    width: fit-content;
`;

const JvrisCardGroup = ({
    id,
    title,
    children,
    style,
    globalCardWrapperStyle
}: JvrisCardGroupProps) => {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <JCGroupWrapper
                    ref={provided.innerRef}
                    style={style}
                    {...provided.droppableProps}
                >
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "black"
                        }}
                    >
                        {title}
                    </h2>
                    {children.map((card, index) => (
                        <JvrisCard
                            globalCardWrapperStyle={globalCardWrapperStyle}
                            key={card.id}
                            {...card}
                            index={index}
                        />
                    ))}
                    {provided.placeholder}
                </JCGroupWrapper>
            )}
        </Droppable>
    );
};

const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result: JvrisCardProps[] = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export interface GroupI {
    id: string;
    title: string;
    items: JvrisCardProps[];
    style?: React.CSSProperties;
}

interface JvrisCardsProps {
    groups: GroupI[];
    updateBoards: (boards: GroupI[]) => void;
    containerStyle?: React.CSSProperties;
    globalGroupStyle?: React.CSSProperties;
    globalCardWrapperStyle?: React.CSSProperties;
    wrapperStyle?: React.CSSProperties;
}

const JvrisCards = ({
    groups: boards,
    updateBoards,
    containerStyle,
    wrapperStyle,
    globalGroupStyle,
    globalCardWrapperStyle
}: JvrisCardsProps) => {
    const onEnd = (res: any) => {
        // dropped outside the list
        if (!res.destination) {
            return;
        }

        if (res.source.droppableId === res.destination.droppableId) {
            const newItems = reorder(
                boards.find((board) => board.id === res.source.droppableId)
                    .items,
                res.source.index,
                res.destination.index
            );

            updateBoards(
                boards.map((board) =>
                    board.id === res.source.droppableId
                        ? { ...board, items: newItems }
                        : board
                )
            );
        } else {
            const source = boards.find(
                (board) => board.id === res.source.droppableId
            );
            const destination = boards.find(
                (board) => board.id === res.destination.droppableId
            );

            const sourceItems = Array.from(source.items);
            const destinationItems = Array.from(destination.items);
            const [removed] = sourceItems.splice(res.source.index, 1);

            destinationItems.splice(res.destination.index, 0, removed);
            updateBoards(
                boards.map((board) => {
                    if (board.id === res.source.droppableId) {
                        return {
                            ...board,
                            items: sourceItems
                        };
                    }
                    if (board.id === res.destination.droppableId) {
                        return {
                            ...board,
                            items: destinationItems
                        };
                    }
                    return board;
                })
            );
        }
    };

    return (
        <DragDropContext onDragEnd={onEnd}>
            <JCGWrapper style={wrapperStyle}>
                <JCContainer style={containerStyle}>
                    {boards.map((board) => (
                        <JvrisCardGroup
                            key={board.id}
                            globalCardWrapperStyle={globalCardWrapperStyle}
                            style={{
                                ...globalGroupStyle,
                                ...board.style
                            }}
                            id={board.id}
                            title={board.title}
                        >
                            {board.items}
                        </JvrisCardGroup>
                    ))}
                </JCContainer>
            </JCGWrapper>
        </DragDropContext>
    );
};

export default JvrisCards;
