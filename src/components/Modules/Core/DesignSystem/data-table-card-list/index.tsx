"use client";

import { FlexRender, type RowData } from "@tanstack/react-table";
import { AnimatePresence } from "motion/react";

import type { DataTableRow, DataTableTable } from "@/@types/Modules/Core/DesignSystem/data-table";
import type { Density } from "@/@types/Modules/Core/DesignSystem/density";
import { DATA_TABLE_SELECT_COLUMN_ID } from "@/constants/Modules/Core/DesignSystem/data-table";

import { DataTableCard } from "../data-table-card";

export function DataTableCardList<TData extends RowData>({
  table,
  rows,
  pinnedRowsKey,
  density,
  renderDetail,
  empty,
}: {
  table: DataTableTable<TData>;
  rows: DataTableRow<TData>[];
  pinnedRowsKey: string;
  density: Density;
  renderDetail?: (row: TData) => React.ReactNode;
  empty?: React.ReactNode;
}) {
  const selectHeader = table
    .getHeaderGroups()
    .flatMap((group) => group.headers)
    .find((header) => header.column.id === DATA_TABLE_SELECT_COLUMN_ID);

  if (rows.length === 0) return <div className="rounded-xl border bg-card">{empty}</div>;

  return (
    <div data-density={density} className="group/table space-y-2">
      {selectHeader ? (
        <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-2.5 text-sm font-medium shadow-xs">
          <FlexRender header={selectHeader} />
          <span aria-hidden="true">Selecionar todos</span>
        </div>
      ) : null}
      <ul className="space-y-2">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((row) => (
            <DataTableCard
              key={row.id}
              row={row}
              pinnedRowsKey={pinnedRowsKey}
              expandable={renderDetail !== undefined}
              detail={renderDetail && row.getIsExpanded() ? renderDetail(row.original) : undefined}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
