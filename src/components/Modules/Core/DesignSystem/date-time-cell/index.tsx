import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { formatDisplayDate } from "@/lib/Modules/Core/DesignSystem/format-display-date";
import { formatDisplayTime } from "@/lib/Modules/Core/DesignSystem/format-display-time";

export function DateTimeCell({ value, empty = EMPTY_VALUE }: { value: string | null; empty?: string }) {
  if (!value) return <span className="text-muted-foreground text-sm">{empty}</span>;
  return (
    <div className="flex flex-col tabular-nums">
      <span className="text-sm">{formatDisplayDate(value)}</span>
      <span className="text-[11px] text-muted-foreground">{formatDisplayTime(value)}</span>
    </div>
  );
}
