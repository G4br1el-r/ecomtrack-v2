import { Package } from "lucide-react";

export function ProductCell({ name, sku }: { name: string; sku: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid size-9 shrink-0 place-items-center rounded-md border bg-muted group-data-[density=compact]/table:size-7">
        <Package className="size-4 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="truncate font-mono text-xs text-muted-foreground group-data-[density=compact]/table:hidden">
          {sku}
        </p>
      </div>
    </div>
  );
}
