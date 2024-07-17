import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    resizable?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, resizable = false, ...props }, ref) => {
        if (resizable) {
            props = {
                ...props,
                onInput: (e) => {
                    let target = e.target as HTMLElement;
                    target.style.height = 'inherit';
                    let fontSize = parseFloat(
                        window.getComputedStyle(target, null).getPropertyValue('font-size'),
                    );
                    target.style.height = `${target.scrollHeight + fontSize}px`;
                },
            };
        }

        return (
            <textarea
                className={cn(
                    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Textarea.displayName = 'Textarea';

export { Textarea };
