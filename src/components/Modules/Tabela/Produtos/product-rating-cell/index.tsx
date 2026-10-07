import { Star } from "lucide-react";

import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";

export function ProductRatingCell({ value }: { value: number }) {
  if (value === 0) return <span className="block text-right text-xs text-muted-foreground">Sem avaliação</span>;
  return (
    <span className="flex items-center justify-end gap-1 font-medium tabular-nums">
      <Star className="size-3.5 fill-warning text-warning" aria-hidden="true" />
      {formatNumber(value, "decimal")}
    </span>
  );
}
