'use client';

import { useState, ReactNode, DragEvent as RDragEvent } from 'react';

export const SortableList = ({ data }: { data: (string | string[] | ReactNode)[] }) => {
    const [indexes, setIndexes] = useState<number[]>([0, 1, 2, 3, 4, 5]);

    const onDragStart = (event: RDragEvent<HTMLDivElement>, index: number) => {
        event.dataTransfer.setData('text/plain', index.toString());
    };

    const onDragOver = (event: RDragEvent<HTMLDivElement>, index: number) => {
        event.preventDefault();
        onDrop(event, targetIndex);
    };

    const onDrop = (event: RDragEvent<HTMLDivElement>, targetIndex: number) => {
        const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
        if (draggedIndex === targetIndex) return;
        const newIndexes = [...indexes];
        [newIndexes[targetIndex], newIndexes[draggedIndex]] = [
            newIndexes[draggedIndex],
            newIndexes[targetIndex],
        ];
        setIndexes(newIndexes);
    };

    return (
        <>
            {indexes.map((i, k) => (
                <div
                    className=" text-5x"
                    key={k}
                    draggable
                    onDragStart={(e) => onDragStart(e, k)}
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, k)}
                >
                    {data[i]}
                </div>
            ))}
        </>
    );
};
