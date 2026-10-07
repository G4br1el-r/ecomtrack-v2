"use client";

import { ChevronsUpDown } from "lucide-react";
import { useRef, useState } from "react";

import type { ComboboxOption } from "@/@types/Modules/Core/DesignSystem/combobox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

export function Combobox<TValue extends string>({
  id,
  options,
  value,
  onValueChange,
  label,
  searchPlaceholder,
  emptyText = "Nada encontrado.",
  placeholder,
  className,
}: {
  id?: string;
  options: ComboboxOption<TValue>[];
  value: TValue;
  onValueChange: (value: TValue) => void;
  label: string;
  searchPlaceholder?: string;
  emptyText?: string;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label={label}
          className={cn("justify-between tabular-nums", className)}
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>{selected?.label ?? placeholder}</span>
          <ChevronsUpDown data-icon="inline-end" aria-hidden="true" className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-(--radix-popover-trigger-width) min-w-24 p-0"
        onOpenAutoFocus={(event) => {
          if (searchPlaceholder) return;
          event.preventDefault();
          commandRef.current?.focus();
        }}
      >
        <Command ref={commandRef} defaultValue={selected?.label} label={label} className="outline-none">
          {searchPlaceholder ? <CommandInput placeholder={searchPlaceholder} /> : null}
          <CommandList>
            {searchPlaceholder ? <CommandEmpty>{emptyText}</CommandEmpty> : null}
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  data-checked={option.value === value}
                  className="cursor-pointer tabular-nums"
                  onSelect={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                >
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
