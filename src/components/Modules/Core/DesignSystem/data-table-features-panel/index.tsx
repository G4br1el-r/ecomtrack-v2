"use client";

import { RotateCcw } from "lucide-react";
import { useId } from "react";

import type { DataTableFeature, DataTableFeatureFlags } from "@/@types/Modules/Core/DesignSystem/data-table";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DATA_TABLE_FEATURE_OPTIONS,
  DATA_TABLE_POPOVER_SCROLL_CLASS,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import { cn } from "@/lib/utils";

export function DataTableFeaturesPanel({
  available,
  features,
  onFeatureChange,
  onReset,
}: {
  available: DataTableFeature[];
  features: DataTableFeatureFlags;
  onFeatureChange: (feature: DataTableFeature, enabled: boolean) => void;
  onReset: () => void;
}) {
  const idPrefix = useId();
  return (
    <>
      <ul aria-label="Recursos" className={cn("divide-y", DATA_TABLE_POPOVER_SCROLL_CLASS)}>
        {available.map((feature) => {
          const option = DATA_TABLE_FEATURE_OPTIONS[feature];
          const switchId = `${idPrefix}-${feature}`;
          return (
            <li key={feature} className="flex items-center justify-between gap-4 px-4 py-2.5">
              <Label htmlFor={switchId} className="min-w-0 cursor-pointer flex-col items-start gap-1">
                <span>{option.label}</span>
                <span className="text-xs leading-snug font-normal text-muted-foreground">{option.description}</span>
              </Label>
              <Switch
                id={switchId}
                checked={features[feature]}
                onCheckedChange={(checked) => onFeatureChange(feature, checked)}
              />
            </li>
          );
        })}
      </ul>
      <div className="border-t p-1.5">
        <Button variant="ghost" size="sm" className="w-full" onClick={onReset}>
          <RotateCcw data-icon="inline-start" aria-hidden="true" />
          Restaurar padrão
        </Button>
      </div>
    </>
  );
}
