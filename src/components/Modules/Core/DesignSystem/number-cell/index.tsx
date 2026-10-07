import type { NumberFormatKind } from "@/@types/Modules/Core/DesignSystem/number-format";
import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { cn } from "@/lib/utils";

export function NumberCell({
  value,
  kind,
  muted = false,
}: {
  value: number | null;
  kind: NumberFormatKind;
  muted?: boolean;
}) {
  return (
    <span
      className={cn("block text-right tabular-nums", muted || value === null ? "text-muted-foreground" : "font-medium")}
    >
      {value === null ? EMPTY_VALUE : formatNumber(value, kind)}
    </span>
  );
}
