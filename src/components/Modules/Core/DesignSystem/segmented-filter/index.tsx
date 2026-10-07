"use client";

import type { SegmentedFilterOption } from "@/@types/Modules/Core/DesignSystem/segmented-filter";
import { ToggleGroup, ToggleGroupItem } from "@/components/animate-ui/components/radix/toggle-group";

export function SegmentedFilter<TValue extends string>({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string;
  options: SegmentedFilterOption<TValue>[];
  value: TValue;
  onValueChange: (value: TValue) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      className="h-9 rounded-md border-input"
      value={value}
      onValueChange={(next) => {
        const option = options.find((candidate) => candidate.value === next);
        if (option) onValueChange(option.value);
      }}
      aria-label={label}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          aria-label={option.count === undefined ? option.label : `${option.label} (${option.count})`}
          className="h-7.5 gap-1.5 px-2.5"
        >
          {option.label}
          {option.count !== undefined ? (
            <span aria-hidden="true" className="text-muted-foreground text-xs tabular-nums">
              {option.count}
            </span>
          ) : null}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
