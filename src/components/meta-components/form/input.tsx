import { Input } from '@/components/ui/input';
import { FieldValues } from 'react-hook-form';
import { FormElementWrapper, FormElementProps } from './wrapper';

interface InputFormElementProps<T extends FieldValues> extends FormElementProps<T> {
    formId?: string;
    onChange?: (newValue: string) => void;
    placeholder?: Partial<T>;
    type?: string;
    className?: string;
}

export const InputFormElement = <T extends FieldValues>({
    formId,
    onChange,
    placeholder,
    type,
    className,
    ...props
}: InputFormElementProps<T>) => (
    <FormElementWrapper
        className={className}
        {...props}
        son={(field) => (
            <Input
                {...field}
                type={type}
                onChange={(e) => {
                    field.onChange(e);
                    if (onChange) {
                        onChange(e.target.value);
                    }
                }}
                className="px-4 h-12"
                placeholder={placeholder?.[field.name] || ''}
                form={formId}
            />
        )}
    />
);
