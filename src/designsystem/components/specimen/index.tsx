import { cn } from "@/lib/utils";

export function Specimen({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="flex flex-col gap-0.5 border-b bg-muted/30 px-4 py-2.5">
        <h3 className="text-sm font-medium">{title}</h3>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </div>
      <div className={cn("flex flex-wrap items-center gap-3 p-5", className)}>{children}</div>
    </div>
  );
}
