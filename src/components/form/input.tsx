import { Input } from '@/components/ui/input';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormElementWrapper, FormElementProps } from './wrapper';

export const InputFormElement = <T extends FieldValues>({
    form,
    label,
    name,
}: FormElementProps<T>) => (
    <FormElementWrapper
        form={form}
        name={name}
        label={label}
        son={(field) => (
            <Input
                {...field}
                onChange={(e) => {
                    field.onChange(e);
                    console.log(form.getValues().title);
                }}
                className="p-4"
            />
        )}
    />
);
