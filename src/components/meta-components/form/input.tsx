import { Input } from '@/components/ui/input';
import { FieldValues } from 'react-hook-form';
import { FormElementWrapper, FormElementProps } from './wrapper';

interface InputFormElementProps<T extends FieldValues> extends FormElementProps<T> {
    onChange?: (newValue: string) => void;
    placeholder?: Partial<T>;
}

export const InputFormElement = <T extends FieldValues>({
    onChange,
    placeholder,
    ...props
}: InputFormElementProps<T>) => (
    <FormElementWrapper
        {...props}
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
                placeholder={placeholder?.[field.name] || ''}
            />
        )}
    />
);
