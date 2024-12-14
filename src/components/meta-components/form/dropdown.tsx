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

interface DropdownFormElementProps<T extends FieldValues> extends FormElementProps<T> {
    values: string[];
    onChange?: (newValue: string) => void;
    className?: string;
}

export function DropdownFormElement<T extends FieldValues>({
    form,
    label,
    name,
    values,
    onChange,
    className
}: DropdownFormElementProps<T>) {
    const [open, setOpen] = useState(false);

    return (
        <FormElementWrapper
            className={className}
            form={form}
            name={name}
            label={label}
            son={(field) => (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="flex w-full justify-between h-12"
                        >
                            {getProperty(form.getValues(), name) ||
                                `Sélectionner ${label.toLocaleLowerCase()}...`}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Command>
                            <CommandInput placeholder={`Sélectionner ${label}...`} />
                            <CommandList>
                                <CommandEmpty>Entrée invalide.</CommandEmpty>
                                <CommandGroup>
                                    {values.map((value) => (
                                        <CommandItem
                                            key={value}
                                            value={value}
                                            onSelect={(newValue) => {
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
                                            {value}
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
