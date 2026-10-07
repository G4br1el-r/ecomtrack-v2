"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { ComboboxOption } from "@/@types/Modules/Core/DesignSystem/combobox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";
import { cn } from "@/lib/utils";

import { FilterChip } from "../filter-chip";

export function MultiCombobox<TValue extends string>({
  id,
  label,
  placeholder,
  searchPlaceholder = "Buscar...",
  emptyText = "Nada encontrado.",
  options,
  value,
  onValueChange,
}: {
  id?: string;
  label: string;
  placeholder: string;
  searchPlaceholder?: string;
  emptyText?: string;
  options: ComboboxOption<TValue>[];
  value: TValue[];
  onValueChange: (value: TValue[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.filter((option) => value.includes(option.value));
  const toggle = (optionValue: TValue) =>
    onValueChange(value.includes(optionValue) ? value.filter((item) => item !== optionValue) : [...value, optionValue]);

  return (
    <div className="flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={label}
            className="w-full justify-between border-input font-normal"
          >
            <span className={cn("truncate", selected.length === 0 && "text-muted-foreground")}>
              {selected.length === 0
                ? placeholder
                : selected.length === 1
                  ? selected[0].label
                  : `${selected.length} selecionados`}
            </span>
            <ChevronsUpDown className="text-muted-foreground" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const checked = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggle(option.value)}
                      className="cursor-pointer gap-2.5 [&>svg:last-child]:hidden"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-4 shrink-0 place-items-center rounded-[4px] border transition-colors",
                          checked ? "border-primary bg-primary text-primary-foreground" : "border-input",
                        )}
                      >
                        {checked ? <Check className="size-3 text-current" /> : null}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
            {value.length > 0 ? (
              <div className="border-t p-1">
                <Button variant="ghost" size="sm" className="w-full" onClick={() => onValueChange([])}>
                  Limpar seleção
                </Button>
              </div>
            ) : null}
          </Command>
        </PopoverContent>
      </Popover>
      <AnimatePresence initial={false}>
        {selected.length > 0 ? (
          <motion.div
            key="selected"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING_SOFT}
            className="overflow-clip"
          >
            <div className="flex flex-wrap gap-1.5 pt-2">
              <AnimatePresence initial={false} mode="popLayout">
                {selected.map((option) => (
                  <FilterChip key={option.value} label={option.label} onRemove={() => toggle(option.value)} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
