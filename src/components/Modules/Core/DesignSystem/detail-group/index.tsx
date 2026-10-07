import { cn } from "@/lib/utils";

export function DetailGroup({
  divided = false,
  className,
  children,
}: {
  divided?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-w-0 rounded-lg border bg-card px-4 py-1", divided && "divide-y", className)}>
      {children}
    </div>
  );
}
