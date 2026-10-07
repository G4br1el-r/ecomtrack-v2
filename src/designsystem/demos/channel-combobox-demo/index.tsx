"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

import { DEMO_CHANNELS } from "../../mocks/demo";

export function ChannelComboboxDemo({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("shopify");
  const selected = DEMO_CHANNELS.find((channel) => channel.value === value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selected?.label ?? "Selecione o canal"}
          <ChevronsUpDown className="text-muted-foreground" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder="Buscar canal..." />
          <CommandList>
            <CommandEmpty>Nenhum canal encontrado.</CommandEmpty>
            <CommandGroup>
              {DEMO_CHANNELS.map((channel) => (
                <CommandItem
                  key={channel.value}
                  value={channel.label}
                  onSelect={() => {
                    setValue(channel.value);
                    setOpen(false);
                  }}
                >
                  {channel.label}
                  <Check
                    className={cn("ml-auto", channel.value === value ? "opacity-100" : "opacity-0")}
                    aria-hidden="true"
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
