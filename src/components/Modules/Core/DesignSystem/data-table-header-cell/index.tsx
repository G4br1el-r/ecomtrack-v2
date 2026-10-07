import { FlexRender, type RowData } from "@tanstack/react-table";

import type { DataTableHeader } from "@/@types/Modules/Core/DesignSystem/data-table";
import { TableHead } from "@/components/ui/table";

import { DataTableResizeHandle } from "../data-table-resize-handle";

export function DataTableHeaderCell<TData extends RowData>({
  header,
  sized,
}: {
  header: DataTableHeader<TData>;
  sized: boolean;
}) {
  const column = header.column;
  return (
    <TableHead
      colSpan={header.colSpan}
      style={sized ? { width: header.getSize() } : undefined}
      className="relative h-9 text-xs font-medium"
    >
      {header.isPlaceholder ? null : <FlexRender header={header} />}
      {column.getCanResize() ? (
        <DataTableResizeHandle
          label={column.columnDef.meta?.label ?? column.id}
          last={header.headerGroup?.headers.at(-1)?.id === header.id}
          resizing={column.getIsResizing()}
          onResize={header.getResizeHandler()}
          onReset={() => column.resetSize()}
        />
      ) : null}
    </TableHead>
  );
}
