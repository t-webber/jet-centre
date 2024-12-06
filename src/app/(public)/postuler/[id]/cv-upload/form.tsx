'use client';

import { DropableFormElts } from './elts';
import { submitCV } from './action';

export function DragAndDrop({ id }: { id: string }) {
    return (
        <form action={(data) => submitCV(id, window.prompt('Votre nom: ') || 'ukn', data)}>
            <DropableFormElts />
        </form>
    );
}
