import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { FormElementProps, FormElementWrapper } from './wrapper';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownFormElementProps<T extends FieldValues> extends FormElementProps<T> {
    values: string[];
}

export const DropdownFormElement = <T extends FieldValues>({
    form,
    label,
    name,
    values,
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
                        {form.getValues()[name] || `Selectionner ${label}...`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder={`Selectionner ${label}...`} />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {values.map((value) => (
                                    <CommandItem
                                        key={value}
                                        value={value}
                                        onSelect={(new_val) => {
                                            form.setValue(name, new_val as PathValue<T, Path<T>>);
                                            console.log(form.getValues()[name]);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                form.getValues()[name] === value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
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
