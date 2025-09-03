// components/ui/combobox.tsx
"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

type ComboBoxProps<T> = {
    items: T[]
    value: string | number | null
    onChange: (value: string | number) => void
    getLabel: (item: T) => string
    getValue: (item: T) => string | number
    placeholder?: string
}

export function ComboBox<T>({
    items,
    value,
    onChange,
    getLabel,
    getValue,
    placeholder = "Select an option",
}: ComboBoxProps<T>) {
    const [open, setOpen] = React.useState(false)

    const selectedItem = items.find((item) => getValue(item).toString() === value?.toString())
    const sortedItems = React.useMemo(() => {
        if (!selectedItem) return items
        return [
            selectedItem,
            ...items.filter((i) => getValue(i).toString() !== value?.toString()),
        ]
    }, [items, value, selectedItem, getValue])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between font-normal"
                >
                    {selectedItem ? getLabel(selectedItem) : placeholder}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command shouldFilter={true}>
                    <CommandInput placeholder={`Search...`} />
                    <CommandList>
                        <CommandEmpty>No result found.</CommandEmpty>
                        <CommandGroup>
                            {sortedItems.map((item) => {
                                const label = getLabel(item)
                                const val = getValue(item)
                                return (
                                    <CommandItem
                                        key={val.toString()}
                                        value={label.toLowerCase()}
                                        onMouseEnter={(e) => e.currentTarget.scrollIntoView({ block: "nearest" })}
                                        onSelect={() => {
                                            onChange(val)
                                            setOpen(false)
                                        }}
                                    >
                                        {label}
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value?.toString() === val.toString()
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
