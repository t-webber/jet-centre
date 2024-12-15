'use client';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { FormElementProps, FormElementWrapper } from './wrapper';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn, getProperty } from '@/lib/utils';
import { useState } from 'react';

interface DropdownFormElementProps<V, T extends FieldValues> extends FormElementProps<T> {
    values: V[];
    onChange?: (newValue: V) => void;
    displayValue?: (value: V) => string;
    getKeyOfValue?: (value: V) => string;
    className?: string;
}

export function DropdownSingleFormElement<V, T extends FieldValues>({
    form,
    label,
    name,
    values,
    onChange,
    displayValue = (value: V) => value as string,
    getKeyOfValue = (value: V) => value as string,
    className
}: DropdownFormElementProps<V, T>) {
    const [open, setOpen] = useState(false);

    return (
        <FormElementWrapper
            className={className}
            form={form}
            name={name}
            label={label}
            reduceLabel={true}
            son={(field) => (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="flex w-full justify-between h-12 focus-visible:ring-0 focus:border-foreground"
                        >
                            {displayValue(getProperty(form.getValues(), name)) ||
                                `Sélectionner un(e) ${label.toLocaleLowerCase()}...`}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Command>
                            <CommandInput
                                placeholder={`Sélectionner un(e) ${label.toLocaleLowerCase()}...`}
                            />
                            <CommandList>
                                <CommandEmpty>Entrée invalide.</CommandEmpty>
                                <CommandGroup>
                                    {values.map((value) => (
                                        <CommandItem
                                            key={getKeyOfValue(value)}
                                            value={getKeyOfValue(value)}
                                            onSelect={(newKey) => {
                                                const newValue = values.find(
                                                    (v) => getKeyOfValue(v) === newKey
                                                )!;

                                                if (onChange) {
                                                    onChange(newValue);
                                                }
                                                form.setValue(
                                                    name,
                                                    newValue as PathValue<T, Path<T>>
                                                );
                                                setOpen(false);
                                                // console.log(
                                                //     name,
                                                //     newValue,
                                                //     getProperty(form.getValues(), name),
                                                //     form.getValues()
                                                // );
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    getProperty(form.getValues(), name) === value
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {displayValue(value)}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        />
    );
}
