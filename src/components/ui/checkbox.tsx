'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            'h-4 w-4 shrink-0 rounded-sm border-[3px] border-checkbox-border ring-offset-background',
            'data-[state=checked]:bg-checkbox-background data-[state=checked]:text-primary-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator className={cn('h-full w-full bg-slate-200')}>
            {/* <Check className="h-4 w-4" /> */}
            {/* <div className="h-4 w-4 bg-slate-200"></div> */}
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
