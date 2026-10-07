import { cn } from "@/lib/utils";

export function BreakdownRow({
  label,
  value,
  detail,
  swatch,
}: {
  label: string;
  value: string;
  detail?: string;
  swatch: { className?: string; color?: string };
}) {
  return (
    <li className="flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-accent/60">
      <span
        aria-hidden="true"
        className={cn("size-2.5 shrink-0 rounded-[3px]", swatch.className)}
        style={swatch.color ? { backgroundColor: swatch.color } : undefined}
      />
      <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold tabular-nums">{value}</span>
      {detail ? <span className="w-12 text-right text-xs text-muted-foreground tabular-nums">{detail}</span> : null}
    </li>
  );
}
