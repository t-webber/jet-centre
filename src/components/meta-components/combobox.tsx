import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type ComboboxProps = {
    emptyMessage: string;
    placeholder: string;
    title: string;
    items: { [key: string]: string };
};

type ManyComboBoxProps = {
    selectedKeys: string[];
    addRemoveKey: (v: string) => void;
} & ComboboxProps;

type SingleComboboxProps = {
    currentKey: string | null;
    selectKey: (key: string) => void;
} & ComboboxProps;

export const ManyComboBox = ({
    selectedKeys,
    addRemoveKey,
    items,
    title,
    emptyMessage,
    placeholder,
}: ManyComboBoxProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open}>
                    {title}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="  p-0">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {Object.entries(items).map(([key, value], i) => (
                                <CommandItem
                                    key={i}
                                    value={key}
                                    onSelect={(val) => addRemoveKey(val)}
                                    className={
                                        selectedKeys.length == 4 && !selectedKeys.includes(key)
                                            ? 'cursor-not-allowed'
                                            : 'cursor-pointer'
                                    }
                                >
                                    <Checkbox
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            selectedKeys.includes(key)
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                        checked={selectedKeys.includes(key)}
                                    />
                                    {value}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export const SingleCombobox = ({
    items,
    emptyMessage,
    currentKey,
    title,
    selectKey,
    placeholder,
}: SingleComboboxProps) => {
    const [open, setOpen] = useState(false);
    const entries = Object.entries(items);
    const getValue = (currentKey: string | null) => {
        if (currentKey) {
            const v = entries.find(([key, _]) => key === currentKey);
            if (v) {
                return v[1];
            }
        }
        return title;
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {getValue(currentKey)}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {entries.map(([key, value], i) => (
                                <CommandItem
                                    key={i}
                                    value={key}
                                    onSelect={(newKey) => {
                                        if (currentKey && currentKey !== newKey) {
                                            selectKey(currentKey);
                                        }
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            currentKey === key ? 'opacity-100' : 'opacity-0',
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
    );
};
