import type { RowData } from "@tanstack/react-table";

import type { DataTableColumn } from "@/@types/Modules/Core/DesignSystem/data-table";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import {
  DATA_TABLE_SELECT_COLUMN_ID,
  DATA_TABLE_UTILITY_COLUMN_OPTIONS,
} from "@/constants/Modules/Core/DesignSystem/data-table";

export function createSelectColumn<TData extends RowData>(): DataTableColumn<TData> {
  return {
    ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
    id: DATA_TABLE_SELECT_COLUMN_ID,
    header: ({ table }) => (
      <Checkbox
        aria-label="Selecionar todos"
        checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? "indeterminate" : false}
        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked === true)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Selecionar linha"
        title="Shift + clique seleciona o intervalo"
        checked={row.getIsSelected()}
        onMouseDown={(event) => {
          if (event.shiftKey) event.preventDefault();
        }}
        onClick={(event) =>
          row.getToggleSelectedHandler()({ shiftKey: event.shiftKey, target: { checked: !row.getIsSelected() } })
        }
      />
    ),
  };
}
