import type { DataTableColumnDraftItem, DataTableColumnLayout } from "@/@types/Modules/Core/DesignSystem/data-table";

export function applyColumnsDraft(draft: DataTableColumnDraftItem[]): DataTableColumnLayout {
  return {
    columnOrder: draft.map((item) => item.id),
    columnVisibility: Object.fromEntries(draft.map((item) => [item.id, item.visible])),
  };
}
