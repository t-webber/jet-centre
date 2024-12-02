'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

import { FaCheck } from 'react-icons/fa';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Label } from '@/components/ui/label';

const className =
    'min-h-[300px] m-auto text-primary w-full max-w-[600px] flex items-center justify-center space-x-4 border-4 border-primary border-dashed';

export const DragAndDrop = ({ id }: { id: string }) => {
    const [uploaded, setUploaded] = useState(false);
    return (
        <>
            {uploaded ? (
                <div className={className}>
                    <h2>CV déposé</h2>
                    <FaCheck />
                </div>
            ) : (
                <Label
                    htmlFor="cvSelector"
                    className={cn(className, 'cursor-pointer')}
                    onDrop={(event) => {
                        event.preventDefault();
                    }}
                    onDragOver={(event) => event.preventDefault()}
                >
                    <h2>Déposez votre CV ici.</h2>
                    <IoCloudUploadOutline />
                </Label>
            )}
            <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="cvSelector"
                onChange={(event) => {
                    event.preventDefault();
                }}
            />
        </>
    );
};
