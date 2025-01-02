import { Input } from '@/components/ui/input';
import { FieldValues } from 'react-hook-form';
import { FormElementWrapper, FormElementProps } from './wrapper';

interface InputFormElementProps<T extends FieldValues> extends FormElementProps<T> {
    formId?: string;
    onChange?: (newValue: string) => void;
    placeholder?: Partial<T>;
    type?: string;
    className?: string;
    'ping-once'?: boolean;
}

export const InputFormElement = <T extends FieldValues>({
    formId,
    onChange,
    placeholder,
    type,
    className,
    'ping-once': pingOnce,
    ...props
}: InputFormElementProps<T>) => (
    <FormElementWrapper
        className={className}
        ping-once={pingOnce}
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
