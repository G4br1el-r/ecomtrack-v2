import type { RowData } from "@tanstack/react-table";

import type { DataTableFeature, DataTableTable } from "@/@types/Modules/Core/DesignSystem/data-table";

export function resetDataTableFeature<TData extends RowData>(
  table: Pick<DataTableTable<TData>, "resetSorting" | "resetColumnSizing" | "resetExpanded" | "resetRowPinning">,
  feature: DataTableFeature,
): void {
  if (feature === "sorting") table.resetSorting(true);
  if (feature === "columnResizing") table.resetColumnSizing(true);
  if (feature === "expanding") table.resetExpanded(true);
  if (feature === "rowPinning") table.resetRowPinning(true);
}
