"use client";

import { Rows3, Rows4 } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/animate-ui/components/radix/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { parseDensity } from "@/lib/Modules/Core/DesignSystem/parse-density";
import { useDensityStore } from "@/store/Modules/Core/DesignSystem/density-store";

export function DensityToggle() {
  const density = useDensityStore((state) => state.density);
  const setDensity = useDensityStore((state) => state.setDensity);
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      className="h-9 rounded-md border-input"
      value={density}
      onValueChange={(value) => {
        if (value) setDensity(parseDensity(value));
      }}
      aria-label="Densidade da tabela"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem value="comfortable" aria-label="Confortável" className="h-7.5">
            <Rows3 aria-hidden="true" />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>Confortável</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem value="compact" aria-label="Compacto" className="h-7.5">
            <Rows4 aria-hidden="true" />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>Compacto</TooltipContent>
      </Tooltip>
    </ToggleGroup>
  );
}
