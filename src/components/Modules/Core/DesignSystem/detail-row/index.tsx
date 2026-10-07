import { cn } from "@/lib/utils";

export function DetailRow({
  label,
  value,
  valueClassName,
  children,
}: {
  label: React.ReactNode;
  value?: React.ReactNode;
  valueClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      {children ?? <span className={cn("text-right text-sm font-medium", valueClassName)}>{value}</span>}
    </div>
  );
}
