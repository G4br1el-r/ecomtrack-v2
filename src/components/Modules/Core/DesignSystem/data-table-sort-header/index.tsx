import type { RowData } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import type { DataTableColumnInstance } from "@/@types/Modules/Core/DesignSystem/data-table";
import { Button } from "@/components/ui/button";
import {
  DATA_TABLE_MULTI_SORT_MIN_COLUMNS,
  DATA_TABLE_SORT_INDEX_OFFSET,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import { cn } from "@/lib/utils";

export function DataTableSortHeader<TData extends RowData, TValue>({
  column,
  title,
  align = "left",
}: {
  column: DataTableColumnInstance<TData, TValue>;
  title?: string;
  align?: "left" | "right";
}) {
  const label = title ?? column.columnDef.meta?.label ?? column.id;
  const sorted = column.getIsSorted();
  const Icon = sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ChevronsUpDown;
  const multiSorted = column.table.store.state.sorting.length >= DATA_TABLE_MULTI_SORT_MIN_COLUMNS;
  return (
    <div className={cn("flex min-w-0 items-center gap-1", align === "right" && "justify-end")}>
      {column.getCanSort() ? (
        <Button
          variant="ghost"
          size="xs"
          className="-mx-2 min-w-0 text-muted-foreground hover:text-foreground"
          onClick={column.getToggleSortingHandler()}
        >
          <span className="truncate">{label}</span>
          <Icon data-icon="inline-end" className={cn(!sorted && "opacity-50")} aria-hidden="true" />
          {sorted && multiSorted ? (
            <span className="text-[0.625rem] text-foreground tabular-nums">
              {column.getSortIndex() + DATA_TABLE_SORT_INDEX_OFFSET}
            </span>
          ) : null}
        </Button>
      ) : (
        <span className="truncate text-muted-foreground">{label}</span>
      )}
    </div>
  );
}
