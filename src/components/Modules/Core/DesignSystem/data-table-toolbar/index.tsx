"use client";

import type { RowData } from "@tanstack/react-table";

import type {
  DataTableColumnLayout,
  DataTableFeature,
  DataTableFeatureFlags,
  DataTableTable,
  DataTableToolbarSlots,
} from "@/@types/Modules/Core/DesignSystem/data-table";

import { DataTableSearch } from "../data-table-search";
import { DataTableSettingsMenu } from "../data-table-settings-menu";

export function DataTableToolbar<TData extends RowData>({
  table,
  available,
  features,
  columnLayout,
  onFeatureChange,
  onResetFeatures,
  onApplyColumns,
  searchPlaceholder,
  search,
  slots,
}: {
  table: DataTableTable<TData>;
  available: DataTableFeature[];
  features: DataTableFeatureFlags;
  columnLayout: DataTableColumnLayout;
  onFeatureChange: (feature: DataTableFeature, enabled: boolean) => void;
  onResetFeatures: () => void;
  onApplyColumns: (layout: DataTableColumnLayout) => void;
  searchPlaceholder?: string;
  search?: { value: string; onSearch: (value: string) => void };
  slots?: DataTableToolbarSlots;
}) {
  const globalFilter: unknown = table.store.state.globalFilter;
  const columns = table
    .getAllColumns()
    .flatMap((column) => column.getLeafColumns())
    .filter((column) => column.getCanHide())
    .map((column) => ({ id: column.id, label: column.columnDef.meta?.label ?? column.id }));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <DataTableSearch
          value={search ? search.value : typeof globalFilter === "string" ? globalFilter : ""}
          placeholder={searchPlaceholder}
          onSearch={search ? search.onSearch : (value) => table.setGlobalFilter(value)}
        />
        {slots?.start}
        <div className="ml-auto flex items-center gap-2">
          {slots?.end}
          <DataTableSettingsMenu
            columns={columns}
            columnLayout={columnLayout}
            onApplyColumns={onApplyColumns}
            available={available}
            features={features}
            onFeatureChange={onFeatureChange}
            onResetFeatures={onResetFeatures}
          />
        </div>
      </div>
      {slots?.below}
    </div>
  );
}
