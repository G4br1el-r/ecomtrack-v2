import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { cn } from "@/lib/utils";

export function VariationBadge({ value, className }: { value: number | null; className?: string }) {
  if (value === null) {
    return (
      <Badge variant="secondary" aria-label="Sem base de comparação" className={className}>
        {EMPTY_VALUE}
      </Badge>
    );
  }
  const positive = value >= 0;
  const Arrow = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <Badge variant={positive ? "success" : "destructive"} className={cn("tabular-nums", className)}>
      <Arrow data-icon="inline-start" aria-hidden="true" />
      {formatNumber(Math.abs(value), "percent")}
    </Badge>
  );
}
