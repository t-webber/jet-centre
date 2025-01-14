import { CSSProperties, Dispatch, forwardRef, ReactNode, SetStateAction, useState } from 'react';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DraggableAttributes,
    CollisionDetection,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    UniqueIdentifier
} from '@dnd-kit/core';
import { pointerWithin, rectIntersection } from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { cn } from '@/lib/utils';

interface WithId {
    id: string;
}

export type DragHandle = (SyntheticListenerMap | undefined) & DraggableAttributes;

type RenderFn<T extends WithId = WithId> = (item: T, dragHandleProps: DragHandle) => ReactNode;

interface ItemManager<T extends WithId = WithId> {
    items: T[];
    moveItem(from: number, to: number): void;
    deleteItem: (id: string) => void;
    addItem: (item: T) => void;
}

interface SortableProps<T extends WithId = WithId> extends ItemManager<T> {
    render: RenderFn<T>;
    className?: string;
}

export function SortableList<T extends WithId = WithId>({
    items,
    moveItem,
    render,
    className
}: SortableProps<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;

        setActiveId(active.id);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over !== null && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            moveItem(oldIndex, newIndex);
        }

        setActiveId(null);
    }

    // TODO: implement a custom collision delection based on closest center and the mouse pointer
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className={cn('flex flex-col gap-2 w-full', className)}>
                    {items.map((item) => (
                        <SortableItem
                            key={item.id}
                            item={item}
                            render={render}
                            active={item.id === activeId}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

// export const Item = forwardRef(({ id, ...props }, ref) => {
//     return (
//         <div {...props} ref={ref} className="z-10 h-10 w-10 bg-red-500">
//             {id}
//         </div>
//     );
// });

function SortableItem<T extends WithId = WithId>({
    item,
    active,
    render
}: {
    item: T;
    active: boolean;
    render: RenderFn<T>;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id
    });

    const style = {
        transform: transformToCSS(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} className={active ? 'z-10' : ''}>
            {render(item, { ...attributes, ...listeners } as any)}
        </div>
    );
}

export function useSortableList<T extends WithId = WithId>(initialItems?: T[]): ItemManager<T> {
    const [items, setItems] = useState(initialItems ?? []);

    function deleteItem(id: string) {
        setItems(items.filter((item) => item.id !== id));
    }

    function addItem(item: T) {
        setItems([...items, item]);
    }

    function moveItem<T>(from: number, to: number) {
        const result = Array.from(items);
        const [removed] = result.splice(from, 1);
        result.splice(to, 0, removed);
        setItems(result);
    }

    return {
        items,
        moveItem,
        deleteItem,
        addItem
    };
}

// Code from: https://github.com/clauderic/dnd-kit/blob/master/packages/utilities/src/css.ts
// Licence: MIT
function transformToCSS(transform: any) {
    const { x, y, scaleX, scaleY } = transform ?? { x: 0, y: 0, scaleX: 1, scaleY: 1 };

    return `translate3d(${x ? Math.round(x) : 0}px, ${y ? Math.round(y) : 0}px, 0)`; //  scaleX(${scaleX}) scaleY(${scaleY})
}
