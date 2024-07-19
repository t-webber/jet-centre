import { Input } from '@/components/ui/input';
import { FieldValues } from 'react-hook-form';
import { FormElementWrapper, FormElementProps } from './wrapper';

interface InputFormElementProps<T extends FieldValues> extends FormElementProps<T> {
    onChange?: (newValue: string) => void;
}

export const InputFormElement = <T extends FieldValues>({
    form,
    label,
    name,
    onChange,
}: InputFormElementProps<T>) => (
    <FormElementWrapper
        form={form}
        name={name}
        label={label}
        son={(field) => (
            <Input
                {...field}
                onChange={(e) => {
                    field.onChange(e);
                    if (onChange) {
                        onChange(e.target.value);
                    }
                    // console.log(form.getValues()[name]);
                }}
                className="p-4"
            />
        )}
    />
);
