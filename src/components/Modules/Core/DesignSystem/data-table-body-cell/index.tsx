import { FlexRender, type RowData } from "@tanstack/react-table";

import type { DataTableCell } from "@/@types/Modules/Core/DesignSystem/data-table";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function DataTableBodyCell<TData extends RowData>({
  cell,
  sized,
}: {
  cell: DataTableCell<TData>;
  sized: boolean;
}) {
  const { column } = cell;
  return (
    <TableCell
      style={sized ? { width: column.getSize() } : undefined}
      className={cn(
        "py-3 transition-[padding,background-color] group-data-[density=compact]/table:py-1.5",
        sized && "truncate",
      )}
    >
      <FlexRender cell={cell} />
    </TableCell>
  );
}
