import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ReactNode } from 'react';

export interface FormElementProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    label: string;
    name: Path<T>;
}

interface FormElementWrapperProps<T extends FieldValues> extends FormElementProps<T> {
    son: (field: ControllerRenderProps<T>) => ReactNode;
}

export const FormElementWrapper = <T extends FieldValues>({
    form,
    label,
    name,
    son,
}: FormElementWrapperProps<T>) => (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>{son(field)}</FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
            </FormItem>
        )}
    />
);
