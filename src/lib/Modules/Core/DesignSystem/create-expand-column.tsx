import type { RowData } from "@tanstack/react-table";

import type { DataTableColumn } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DataTableExpandButton } from "@/components/Modules/Core/DesignSystem/data-table-expand-button";
import {
  DATA_TABLE_EXPAND_COLUMN_ID,
  DATA_TABLE_UTILITY_COLUMN_OPTIONS,
} from "@/constants/Modules/Core/DesignSystem/data-table";

export function createExpandColumn<TData extends RowData>(): DataTableColumn<TData> {
  return {
    ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
    id: DATA_TABLE_EXPAND_COLUMN_ID,
    header: () => <span className="sr-only">Detalhes</span>,
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <DataTableExpandButton
          expanded={row.getIsExpanded()}
          label={row.getIsExpanded() ? "Ocultar detalhes" : "Ver detalhes"}
          onToggle={row.getToggleExpandedHandler()}
        />
      ) : null,
  };
}
