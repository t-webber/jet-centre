import { Input } from '@/components/ui/input';
import { FieldValues } from 'react-hook-form';
import { FormElementWrapper, FormElementProps } from './wrapper';
import React from 'react';

interface InputFormElementProps<T extends FieldValues> extends FormElementProps<T> {
    formId?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
                    field.onChange(type === 'number' ? Number(e.target.value) : e.target.value);
                    if (onChange) {
                        onChange(e);
                    }
                }}
                className="px-4 h-12"
                placeholder={placeholder?.[field.name] || ''}
                form={formId}
            />
        )}
    />
);
