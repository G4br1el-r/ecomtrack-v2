import { FlexRender, type RowData } from "@tanstack/react-table";

import type { DataTableCell } from "@/@types/Modules/Core/DesignSystem/data-table";

export function DataTableCardField<TData extends RowData>({ cell }: { cell: DataTableCell<TData> }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-4 py-2 group-data-[density=compact]/table:min-h-9 group-data-[density=compact]/table:py-1.5">
      <dt className="shrink-0 text-sm text-muted-foreground">{cell.column.columnDef.meta?.label ?? cell.column.id}</dt>
      <dd className="flex min-w-0 justify-end text-right text-sm font-medium break-words text-foreground">
        <FlexRender cell={cell} />
      </dd>
    </div>
  );
}
