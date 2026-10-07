import type { RowData } from "@tanstack/react-table";

import type { DataTableColumn } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DataTableRowPinButton } from "@/components/Modules/Core/DesignSystem/data-table-row-pin-button";
import {
  DATA_TABLE_ROW_PIN_COLUMN_ID,
  DATA_TABLE_UTILITY_COLUMN_OPTIONS,
} from "@/constants/Modules/Core/DesignSystem/data-table";

export function createRowPinColumn<TData extends RowData>(): DataTableColumn<TData> {
  return {
    ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
    id: DATA_TABLE_ROW_PIN_COLUMN_ID,
    header: () => <span className="sr-only">Fixar linha</span>,
    cell: ({ row }) => (
      <DataTableRowPinButton
        pinned={row.getIsPinned() !== false}
        onToggle={() => row.pin(row.getIsPinned() ? false : "top")}
      />
    ),
  };
}
