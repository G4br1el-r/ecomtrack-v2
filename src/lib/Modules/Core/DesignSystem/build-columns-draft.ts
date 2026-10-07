import type {
  DataTableColumnDraftItem,
  DataTableColumnLayout,
  DataTableColumnOption,
} from "@/@types/Modules/Core/DesignSystem/data-table";

export function buildColumnsDraft(
  columns: DataTableColumnOption[],
  layout: DataTableColumnLayout,
): DataTableColumnDraftItem[] {
  const position = (id: string) => {
    const index = layout.columnOrder.indexOf(id);
    return index === -1 ? layout.columnOrder.length + columns.findIndex((column) => column.id === id) : index;
  };
  return [...columns]
    .sort((first, second) => position(first.id) - position(second.id))
    .map((column) => ({
      ...column,
      visible: layout.columnVisibility[column.id] !== false,
    }));
}
