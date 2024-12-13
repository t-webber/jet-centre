import {
    Command,
    CommandDialog,
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
import { cn } from '@/lib/utils';

interface DropdownFormElementProps<T extends FieldValues> extends FormElementProps<T> {
    values: string[];
    onChange?: (newValue: string) => void;
}

export const DropdownFormElement = <T extends FieldValues>({
    form,
    label,
    name,
    values,
    onChange
}: DropdownFormElementProps<T>) => (
    <FormElementWrapper
        form={form}
        name={name}
        label={label}
        son={(field) => (
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        // aria-expanded={open}
                        className="flex w-full justify-between"
                    >
                        {form.getValues()[name] || `Sélectionner ${label}...`}
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
                                            form.setValue(name, newValue as PathValue<T, Path<T>>);
                                            // console.log(form.getValues()[name]);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                form.getValues()[name] === value
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
