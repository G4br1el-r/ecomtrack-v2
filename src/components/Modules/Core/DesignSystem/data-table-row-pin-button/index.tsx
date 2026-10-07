"use client";

import { Pin, PinOff } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { Button } from "@/components/ui/button";

export function DataTableRowPinButton({ pinned, onToggle }: { pinned: boolean; onToggle: () => void }) {
  const label = pinned ? "Desafixar linha" : "Fixar linha no topo";
  const Icon = pinned ? PinOff : Pin;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={label} aria-pressed={pinned} onClick={onToggle}>
          <Icon aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
