import type { RowData } from "@tanstack/react-table";

import type { DataTableColumn } from "@/@types/Modules/Core/DesignSystem/data-table";

import { createExpandColumn } from "./create-expand-column";
import { createRowPinColumn } from "./create-row-pin-column";
import { createSelectColumn } from "./create-select-column";

export function buildDataTableColumns<TData extends RowData>(
  columns: DataTableColumn<TData>[],
  utilities: { select: boolean; expand: boolean; rowPin: boolean },
): DataTableColumn<TData>[] {
  return [
    ...(utilities.select ? [createSelectColumn<TData>()] : []),
    ...(utilities.expand ? [createExpandColumn<TData>()] : []),
    ...(utilities.rowPin ? [createRowPinColumn<TData>()] : []),
    ...columns,
  ];
}
