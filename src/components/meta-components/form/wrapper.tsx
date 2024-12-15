import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../ui/form';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

export interface FormElementProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    label: string;
    name: Path<T>;
}

interface FormElementWrapperProps<T extends FieldValues> extends FormElementProps<T> {
    son: (field: ControllerRenderProps<T>) => ReactNode;
    description?: string | ReactNode;
    className?: string;
    reduceLabel?: boolean;
}

export function FormElementWrapper<T extends FieldValues>({
    form,
    label,
    name,
    son,
    description,
    reduceLabel = false,
    className
}: FormElementWrapperProps<T>) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('group relative mt-2', className)}>
                    <FormLabel
                        className={cn(
                            'absolute left-2 top-6 bg-box-background w-fit px-1 text-lg line-h leading-4 rounded-md whitespace-nowrap pointer-events-none transition-all',
                            (reduceLabel || field.value.toString() !== '') &&
                                'text-input left-2 top-0',
                            'group-focus-within:text-inherit group-focus-within:left-2 group-focus-within:top-0'
                        )}
                    >
                        {label}
                    </FormLabel>
                    <FormControl>{son(field)}</FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
