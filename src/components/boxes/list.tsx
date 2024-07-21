'use client';

import {
    Box,
    BoxContent,
    BoxHeader,
    BoxTitle,
    BoxCollapseButton,
    BoxHeaderBlock,
    BoxDragHandle,
} from './boxes';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState, memo, ReactNode } from 'react';

function reorder<T>(list: Array<T>, startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

type BoxContent = {
    title: string;
    content: ReactNode;
};

type ItemType = BoxContent & { id: string };

export function ListBox({ items: boxes }: { items: Array<BoxContent> }) {
    const [items, setItems] = useState<Array<ItemType>>(
        boxes.map((box: BoxContent, index: number) => ({ ...box, id: `box-id-${index}` })),
    );

    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const reordered_items = reorder(items, result.source.index, result.destination.index);

        setItems(reordered_items);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list-box">
                {(provided) => (
                    <div
                        className="flex flex-col"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <ItemList items={items} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

const ItemList = memo(function ItemList({ items }: { items: Array<ItemType> }) {
    return items.map((note: ItemType, index: number) => (
        <Item note={note} index={index} key={note.id} />
    ));
});

function Item({ note, index }: { note: ItemType; index: number }): ReactNode {
    const [collapse, setCollapse] = useState(false);

    return (
        <Draggable draggableId={note.id.toString()} index={index}>
            {(provided) => (
                <Box
                    className="w-full mb-main"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <BoxHeader>
                        <BoxTitle>{note.title}</BoxTitle>
                        <BoxHeaderBlock>
                            <BoxCollapseButton collapse={collapse} setCollapse={setCollapse} />
                            <BoxDragHandle {...provided.dragHandleProps} />
                        </BoxHeaderBlock>
                    </BoxHeader>
                    <BoxContent collapse={collapse}>
                        {note.content}
                    </BoxContent>
                </Box>
            )}
        </Draggable>
    );
}
