import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({ rows, columns }: { rows: number; columns: number }) {
  const rowKeys = Array.from({ length: rows }, (_, index) => `row-${index}`);
  const columnKeys = Array.from({ length: columns }, (_, index) => `col-${index}`);
  return (
    <div className="divide-y rounded-lg border" aria-busy="true">
      {rowKeys.map((rowKey) => (
        <div key={rowKey} className="flex items-center gap-4 px-4 py-3.5">
          <Skeleton className="size-4 rounded-sm" />
          {columnKeys.map((columnKey) => (
            <Skeleton key={columnKey} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
