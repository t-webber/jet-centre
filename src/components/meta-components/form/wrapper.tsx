import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../ui/form';
import { ReactNode } from 'react';
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
}

export const FormElementWrapper = <T extends FieldValues>({
    form,
    label,
    name,
    son,
    description,
    className
}: FormElementWrapperProps<T>) => (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem className={cn('relative mt-2', className)}>
                <FormLabel className="absolute left-2 top-0 bg-box-background w-fit px-1 text-lg line-h leading-4 rounded-md whitespace-nowrap text-input">
                    {label}
                </FormLabel>
                <FormControl>{son(field)}</FormControl>
                {description && <FormDescription>{description}</FormDescription>}
                <FormMessage />
            </FormItem>
        )}
    />
);
