import { CSSProperties, ReactNode, useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DraggingStyle,
    NotDraggingStyle,
    DropResult,
} from 'react-beautiful-dnd';

// https://github.com/atlassian/react-beautiful-dnd?tab=readme-ov-file
// https://codesandbox.io/s/k260nyxq9v?from-embed=&file=/index.js:0-2887

interface SortableProps<T> {
    initialItems: T[];
    padding?: number;
    itemStyle?: CSSProperties;
    listStyle?: CSSProperties;
    render: (item: T) => ReactNode;
    getKey: (item: T) => string;
    colors: {
        dragging_color?: string;
        notDragging_color?: string;
        draggingOver_color?: string;
        notDraggingOver_color?: string;
    };
}

export default function App<T>({
    initialItems,
    padding = 8,
    itemStyle,
    listStyle,
    getKey,
    render,
    colors: {
        dragging_color = 'lightgreen',
        notDragging_color = 'grey',
        draggingOver_color = 'lightblue',
        notDraggingOver_color = 'lightgray',
    },
}: SortableProps<T>) {
    const reorder = (list: T[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const getItemStyle = (
        isDragging: boolean,
        draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
    ): CSSProperties => ({
        userSelect: 'none',
        // padding: padding * 2,
        // margin: `0 0 ${padding}px 0`,
        // background: isDragging ? dragging_color : notDragging_color,
        ...itemStyle,
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        // background: isDraggingOver ? draggingOver_color : notDraggingOver_color,
        // padding: padding,
        // width: 250,
        // ...listStyle,
    });

    const [items, setItems] = useState(initialItems);

    const onDragEnd = (result: DropResult) => {
        if (result.destination) {
            setItems(reorder(items, result.source.index, result.destination.index));
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {items.map((item, index) => (
                            <Draggable key={getKey(item)} draggableId={getKey(item)} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                        )}
                                    >
                                        {render(item)}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
