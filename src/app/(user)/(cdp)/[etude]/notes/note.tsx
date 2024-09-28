'use client';

import { useState } from 'react';

import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import {
    Box,
    BoxHeader,
    BoxHeaderBlock,
    BoxTitle,
    BoxCollapseButton,
    BoxDragHandle,
    BoxCollapser,
    BoxContent,
} from '@/components/boxes/boxes';
import MDXEditor from '@/components/note/mdxEditor';

export default function Notes({
    title,
    markdown,
    dragHandleProps,
}: {
    title: string;
    markdown: string;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}) {
    const [collapse, setCollapse] = useState(true);

    return (
        <Box className="w-full">
            <BoxHeader {...dragHandleProps}>
                <BoxTitle>{title}</BoxTitle>
                <BoxHeaderBlock>
                    <BoxCollapseButton collapse={collapse} setCollapse={setCollapse} />
                    <BoxDragHandle />
                </BoxHeaderBlock>
            </BoxHeader>
            <BoxCollapser collapse={collapse}>
                <BoxContent>
                    <MDXEditor markdown={markdown} displayToolbar={true} />
                </BoxContent>
            </BoxCollapser>
        </Box>
    );
}
